package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Event;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserAdditionDTO;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.models.enums.EventType;
import edu.spbu.datacontrol.models.enums.Role;
import edu.spbu.datacontrol.repositories.EventRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserRepository userRepository;
    private EventRepository eventLog;

    public UserController(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventLog = eventRepository;
    }

    @PostMapping("/add")
    public String addUser(@RequestBody UserAdditionDTO userData) {

        User newUser = new User(userData);
        this.assignProductOwners(newUser, userData.getProductOwnersNames());
        try {
            this.assignSupervisor(newUser, userData.getSupervisorName());
            this.assignTeamLead(newUser, userData.getTeamLeadName());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(409), e.getMessage());
        }

        newUser = userRepository.save(newUser);
        Event userAddition = new Event(newUser.getId(), EventType.ADD_USER, "");
        eventLog.save(userAddition);

        return "User successfully added.";
    }

    @GetMapping("/getUsersByRole")
    public ResponseEntity<List<UserDTO>> getUsersByRole(@RequestParam String role) {

        try {
            return new ResponseEntity<>(
                userRepository.getUsersByRole(Role.fromString(role)).stream().map(UserDTO::new)
                    .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
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
