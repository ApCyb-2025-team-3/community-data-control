package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Event;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserAdditionDTO;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.models.enums.*;
import edu.spbu.datacontrol.repositories.EventRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
            this.assignTeamLead(newUser, userData.getTeamLeadName());
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                "Wrong users were sent to assign as supervisor and team lead.",
                HttpStatusCode.valueOf(409));
        }

        newUser = userRepository.save(newUser);
        Event userAddition = new Event(newUser.getId(), EventType.ADD_USER, "");
        eventLog.save(userAddition);

        return new ResponseEntity<>("User successfully added.", HttpStatusCode.valueOf(201));
    }

    @GetMapping("/getUsersByRole")
    public ResponseEntity<List<UserDTO>> getUsersByRole(@RequestParam String role) {

        try {
            return new ResponseEntity<>(
                    userRepository.getUsersByRole(EnumUtils.fromString(Role.class, role)).stream()
                        .filter(User::isActive)
                        .map(UserDTO::new)
                        .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getUsersByGrade")
    public ResponseEntity<List<UserDTO>> getUsersByGrade(@RequestParam String grade) {
        try {
            return new ResponseEntity<>(
                    userRepository.getUsersByGrade(EnumUtils.fromString(Grade.class, grade)).stream()
                        .filter(User::isActive)
                        .map(UserDTO::new)
                        .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getUsersBySupervisorID")
    public ResponseEntity<List<UserDTO>> getUsersBySupervisorID(@RequestParam UUID supervisorId) {
        try {
            User user = userRepository.getUserById(supervisorId);
            if (user.getRole() == Role.SUPERVISOR) {
            return new ResponseEntity<>(
                userRepository.getUsersBySupervisor(user).stream()
                    .map(UserDTO::new)
                    .toList(), HttpStatusCode.valueOf(200));
            }
            else {
                throw new IllegalArgumentException("This user isn't supervisor");
            }
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }
    }

    @PostMapping("/dismissUserById")
    public ResponseEntity<String> dismissUserById(@RequestParam UUID uuid, @RequestParam String description) {
        User dismissedUser = userRepository.findById(uuid).orElse(null);
        if (dismissedUser != null) {
            dismissedUser.setActive(false);
            dismissedUser.setProject(null);
            dismissedUser.setTeamLead(null);
            dismissedUser.setProductOwners(null);
            dismissedUser.setMentorStatus(MentorshipStatus.NOT_PARTICIPATING);
            userRepository.save(dismissedUser);
            Event event = new Event(uuid, EventType.DISMISS_USER, description);
            eventLog.save(event);
            return  new ResponseEntity<>("User was successfully dismissed" ,HttpStatusCode.valueOf(200));
        } else {
            return new ResponseEntity<>("This user doesn't exist" ,HttpStatusCode.valueOf(404));
        }
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

    private void assignTeamLead(User user, String teamLeadName) throws IllegalArgumentException {
        List<User> possibleTeamLeads = userRepository.getUsersByNameAndRole(teamLeadName,
                Role.TEAM_LEAD);

        if (possibleTeamLeads.size() > 1) {
            possibleTeamLeads = filterUsersByProject(possibleTeamLeads, Role.TEAM_LEAD,
                    user.getProject());
        }
        user.setTeamLead(!possibleTeamLeads.isEmpty() ? possibleTeamLeads.get(0) : null);
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
