package edu.spbu.datacontrol.userservice;


import edu.spbu.datacontrol.commons.User;
import edu.spbu.datacontrol.commons.UserAdditionDTO;
import edu.spbu.datacontrol.commons.UserDTO;
import edu.spbu.datacontrol.commons.UserDataChangeDTO;
import edu.spbu.datacontrol.commons.enums.*;
import edu.spbu.datacontrol.eventservice.EventClient;
import edu.spbu.datacontrol.eventservice.models.Event;
import edu.spbu.datacontrol.eventservice.models.EventType;
import edu.spbu.datacontrol.userservice.models.ChangeUserProjectDTO;
import edu.spbu.datacontrol.userservice.models.UserInfoDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final EventClient eventLog;

    @Value("${event.service.url}")
    private String eventServiceUrl;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.eventLog = new EventClient(eventServiceUrl);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody UserAdditionDTO userData) {

        if (userData.getName() == null || userData.getName().isEmpty()) {
            return new ResponseEntity<>("Null user name", HttpStatus.BAD_REQUEST);
        }
        if (userData.getProductOwnersNames() == null) {
            return new ResponseEntity<>("Null ProductOwnersNames", HttpStatus.NOT_ACCEPTABLE);
        }
        if (userData.getInvitedAt() == null) {
            userData.setInvitedAt(LocalDate.now());
        }

        User newUser = new User(userData);
        this.assignProductOwners(newUser, userData.getProductOwnersNames());
        try {
            this.assignSupervisor(newUser, userData.getSupervisorName());
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                    "Wrong users were sent to assign as supervisor and team lead.",
                    HttpStatus.CONFLICT);
        }

        newUser = userRepository.save(newUser);
        Event userAddition = new Event(newUser.getId(), EventType.ADD_USER, "");
        eventLog.saveEvent(userAddition);

        return new ResponseEntity<>("User successfully added.", HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID userId) {

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return new ResponseEntity<>(new UserDTO(user), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{userId}/fullInfo")
    public ResponseEntity<UserInfoDTO> getFullUserInfoById(@PathVariable UUID userId) {

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            UserInfoDTO userInfo = new UserInfoDTO(user);

            Event projectChange = eventLog.getLastByUserAndType(userId,
                    EventType.CHANGE_PROJECT);
            if (projectChange != null) {
                userInfo.setProjectChangedAt(
                        projectChange.getEventDate());
            } else {
                userInfo.setProjectChangedAt(user.getInvitedAt());
            }

            Event dismiss = eventLog.getLastByUserAndType(userId,
                    EventType.DISMISS_USER);
            if (dismiss != null) {
                userInfo.setDismissedAt(
                        dismiss.getEventDate());
                userInfo.setDismissReason(dismiss.getDescription());
            }

            return new ResponseEntity<>(userInfo, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getUsersByRole")
    public ResponseEntity<List<UserDTO>> getUsersByRole(@RequestParam String role) {

        try {
            return new ResponseEntity<>(
                    userRepository.getUsersByRoleAndIsActiveTrue(EnumUtils.fromString(Role.class, role))
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getUsersByGrade")
    public ResponseEntity<List<UserDTO>> getUsersByGrade(@RequestParam String grade) {

        try {
            return new ResponseEntity<>(
                    userRepository.getUsersByGradeAndIsActiveTrue(
                                    EnumUtils.fromString(Grade.class, grade))
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getUsersBySupervisor")
    public ResponseEntity<List<UserDTO>> getUsersBySupervisorName(@RequestParam String partialName) {

        try {
            List<UserDTO> subordinateUsers = new ArrayList<>();

            List<User> supervisors = userRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(partialName)
                    .stream()
                    .filter(user -> user.getRole() == Role.SUPERVISOR)
                    .toList();

            if (supervisors.isEmpty()) {
                return new ResponseEntity<>(subordinateUsers, HttpStatus.OK);
            }

            for (User supervisor : supervisors) {
                List<User> subordinates = userRepository.getUsersBySupervisor(supervisor);
                subordinateUsers.addAll(subordinates.stream()
                        .map(UserDTO::new)
                        .toList());
            }

            return new ResponseEntity<>(subordinateUsers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getDismissedUsers")
    public ResponseEntity<List<UserDTO>> getDismissedUsers() {

        return new ResponseEntity<>(
                userRepository.getUsersByIsActiveFalse().stream()
                        .map(UserDTO::new)
                        .toList(), HttpStatus.OK);
    }

    @GetMapping("/getUsersByDepartment")
    public ResponseEntity<List<UserDTO>> getUsersByDepartment(@RequestParam String department) {

        if (!department.isBlank()) {
            return new ResponseEntity<>(
                    userRepository.getUsersByDepartmentContainingIgnoreCaseAndIsActiveTrue(department).stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @GetMapping("/getUsersByProject")
    public ResponseEntity<List<UserDTO>> getUsersByProject(@RequestParam String project) {

        if (!project.isBlank()) {
            return new ResponseEntity<>(
                    userRepository.getUsersByProjectContainingIgnoreCaseAndIsActiveTrue(project).stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @PostMapping("/{userId}/dismiss")
    public ResponseEntity<String> dismissUserById(@PathVariable UUID userId,
                                                  @RequestParam LocalDate date,
                                                  @RequestParam String description) {

        User dismissedUser = userRepository.findById(userId).orElse(null);
        if (dismissedUser != null) {
            dismissedUser.setActive(false);
            dismissedUser.setProject(null);
            dismissedUser.setProductOwners(null);
            dismissedUser.setMentorStatus(MentorshipStatus.NOT_PARTICIPATING);
            dismissedUser.setSupervisor(null);
            userRepository.save(dismissedUser);

            if (dismissedUser.getRole() == Role.SUPERVISOR) {
                List<User> subordinates = userRepository.getUsersBySupervisor(dismissedUser);
                subordinates.forEach(t -> t.setSupervisor(null));
                userRepository.saveAll(subordinates);

            } else if (dismissedUser.getRole() == Role.PRODUCT_OWNER) {
                List<User> subordinates = userRepository.getUsersByProductOwnersContaining(dismissedUser);
                subordinates.forEach(t -> t.getProductOwners().remove(dismissedUser));
                userRepository.saveAll(subordinates);
            }

            Event event = new Event(userId, EventType.DISMISS_USER, date, description);
            eventLog.saveEvent(event);
            return new ResponseEntity<>("User was successfully dismissed",
                    HttpStatus.OK);
        }

        return new ResponseEntity<>("This user doesn't exist", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/changeUsersPersonalData")
    public ResponseEntity<String> changeUsersPersonalData(@RequestParam String reason,
                                                          @RequestBody UserDataChangeDTO modifiedData) {

        User user = userRepository.findById(modifiedData.getUserId()).orElse(null);
        if (user != null) {
            user.changePersonalData(modifiedData);
            userRepository.save(user);
            eventLog.saveEvent(new Event(user.getId(), EventType.CHANGE_PERSONAL_DATA, reason));

            return new ResponseEntity<>("User's personal data was successfully modified",
                    HttpStatus.OK);
        }

        return new ResponseEntity<>("This user doesn't exist", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{userId}/changeGrade")
    public ResponseEntity<String> changeUserGrade(@PathVariable UUID userId,
                                                  @RequestParam String grade,
                                                  @RequestParam String reason) {

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            try {
                user.setGrade(EnumUtils.fromString(Grade.class, grade));
                userRepository.save(user);
                eventLog.saveEvent(new Event(user.getId(), EventType.CHANGE_GRADE, reason));
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>("Unknown grade is sent", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>("User's grade was successfully changed",
                    HttpStatus.OK);
        }

        return new ResponseEntity<>("This user doesn't exist", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{userId}/changeRole")
    public ResponseEntity<String> changeUserRole(@PathVariable UUID userId,
                                                 @RequestParam String role,
                                                 @RequestParam String reason) {

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            try {
                Role oldRole = user.getRole();
                user.setRole(EnumUtils.fromString(Role.class, role));
                userRepository.save(user);
                eventLog.saveEvent(new Event(user.getId(), EventType.CHANGE_ROLE, reason));

                if (oldRole == Role.SUPERVISOR) {
                    List<User> subordinates = userRepository.getUsersBySupervisor(user);
                    subordinates.forEach(t -> t.setSupervisor(null));
                    userRepository.saveAll(subordinates);

                } else if (oldRole == Role.PRODUCT_OWNER) {
                    List<User> subordinates = userRepository.getUsersByProductOwnersContaining(user);
                    subordinates.forEach(t -> t.getProductOwners().remove(user));
                    userRepository.saveAll(subordinates);
                }

            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>("Unknown role is sent", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>("User's role was successfully changed",
                    HttpStatus.OK);
        }

        return new ResponseEntity<>("This user doesn't exist", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/changeUserProject")
    public ResponseEntity<String> changeUserProject(@RequestBody ChangeUserProjectDTO changeUserProjectDTO) {

        User user = userRepository.findById(changeUserProjectDTO.getUserId()).orElse(null);
        if (user != null) {
            String oldProject = user.getProject();

            user.setProject(changeUserProjectDTO.getProject());
            user.setDepartment(changeUserProjectDTO.getDepartment());
            user.setProjectChangedAt(changeUserProjectDTO.getChangedAt());
            assignSupervisor(user, changeUserProjectDTO.getSupervisor());
            assignProductOwners(user, Arrays.stream(changeUserProjectDTO.getProductOwners()).toList());

            userRepository.save(user);
            eventLog.saveEvent(new Event(user.getId(), EventType.CHANGE_PROJECT,
                    changeUserProjectDTO.getChangedAt(), oldProject, changeUserProjectDTO.getProject()));

            return new ResponseEntity<>("User's project was successfully modified", HttpStatus.OK);
        }

        return new ResponseEntity<>("This user doesn't exist", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getUsersByPartialName")
    public ResponseEntity<List<UserDTO>> getUsersByPartialName(@RequestParam String partialName) {

        if (!partialName.isBlank()) {
            return new ResponseEntity<>(
                    userRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(partialName).stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    private void assignSupervisor(User user, String supervisorName) throws IllegalArgumentException {

        List<User> possibleSupervisors = userRepository.getUsersByNameAndRole(supervisorName,
                Role.SUPERVISOR);

        if (possibleSupervisors.size() > 1) {
            possibleSupervisors = filterUsersByProject(possibleSupervisors, Role.SUPERVISOR,
                    user.getProject());
        }
        user.setSupervisor(!possibleSupervisors.isEmpty() ? possibleSupervisors.get(0) : null);
    }

    private List<User> filterUsersByProject(List<User> users, Role role, String project) {

        users = users.stream()
                .filter(t -> t.getProject().equals(project)).toList();

        if (users.size() > 1) {
            throw new IllegalArgumentException(
                    "Cannot find exact user for assigning as " + role.toString());
        }

        return users;
    }

    private void assignProductOwners(User user, List<String> productOwnersNames) {

        List<User> filteredProductOwners = userRepository.getUsersByNameInAndRole(
                productOwnersNames, Role.PRODUCT_OWNER);

        user.setProductOwners(!filteredProductOwners.isEmpty() ? filteredProductOwners : null);
    }

}
