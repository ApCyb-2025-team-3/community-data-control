package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.*;
import edu.spbu.datacontrol.models.enums.*;
import edu.spbu.datacontrol.repositories.EventRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final EventRepository eventLog;

    public UserController(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventLog = eventRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody UserAdditionDTO userData) {

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
        eventLog.save(userAddition);

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
            return new ResponseEntity<>(new UserInfoDTO(user), HttpStatus.OK);
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

    @GetMapping("/getUsersBySupervisorId")
    public ResponseEntity<List<UserDTO>> getUsersBySupervisorId(@RequestParam UUID supervisorId) {

        try {
            User user = userRepository.getUserById(supervisorId);
            if (user.getRole() == Role.SUPERVISOR) {
                return new ResponseEntity<>(
                        userRepository.getUsersBySupervisor(user).stream()
                                .map(UserDTO::new)
                                .toList(), HttpStatus.OK);
            }

            throw new IllegalArgumentException("This user isn't supervisor");

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
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

        return new ResponseEntity<>(
                userRepository.getUsersByDepartmentAndIsActiveTrue(department).stream()
                        .map(UserDTO::new)
                        .toList(), HttpStatus.OK);
    }

    @GetMapping("/getUsersByProject")
    public ResponseEntity<List<UserDTO>> getUsersByProject(@RequestParam String project) {

        return new ResponseEntity<>(
                userRepository.getUsersByProjectAndIsActiveTrue(project).stream()
                        .map(UserDTO::new)
                        .toList(), HttpStatus.OK);
    }

    @PostMapping("/{userId}/dismiss")
    public ResponseEntity<String> dismissUserById(@PathVariable UUID userId,
                                                  @RequestParam String description) {

        User dismissedUser = userRepository.findById(userId).orElse(null);
        if (dismissedUser != null) {
            dismissedUser.setActive(false);
            dismissedUser.setProject(null);
            dismissedUser.setProductOwners(null);
            dismissedUser.setMentorStatus(MentorshipStatus.NOT_PARTICIPATING);
            dismissedUser.setSupervisor(null);
            userRepository.save(dismissedUser);
            Event event = new Event(userId, EventType.DISMISS_USER, description);
            eventLog.save(event);
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
            eventLog.save(new Event(user.getId(), EventType.CHANGE_PERSONAL_DATA, reason));

            return new ResponseEntity<>("User's personal data was successfully modified",
                    HttpStatus.OK);
        }

        return new ResponseEntity<>("This user doesn't exist", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/changeUserGrade")
    public ResponseEntity<String> changeUserGrade(@RequestParam UUID userId,
                                                  @RequestParam String grade,
                                                  @RequestParam String reason) {

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            try {
                user.setGrade(EnumUtils.fromString(Grade.class, grade));
                userRepository.save(user);
                eventLog.save(new Event(user.getId(), EventType.CHANGE_GRADE, reason));
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>("Unknown grade is sent", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>("User's grade was successfully changed",
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
            assignSupervisor(user,changeUserProjectDTO.getSupervisor());
            assignProductOwners(user, Arrays.stream(changeUserProjectDTO.getProductOwners()).toList());

            userRepository.save(user);
            eventLog.save(new Event(user.getId(), EventType.CHANGE_PROJECT,
                    oldProject, changeUserProjectDTO.getProject()));

            return new ResponseEntity<>("User's project was successfully modified", HttpStatus.OK);
        }

        return new ResponseEntity<>("This user doesn't exist", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getUsersByPartialName")
    public ResponseEntity<List<UserDTO>> getUsersByPartialName(@RequestParam String partialName) {
        return new ResponseEntity<>(
                userRepository.findByNameContaining(partialName).stream()
                        .map(UserDTO::new)
                        .toList(), HttpStatus.OK);
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
