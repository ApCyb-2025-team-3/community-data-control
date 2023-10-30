package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Event;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserAdditionDTO;
import edu.spbu.datacontrol.models.enums.EventType;
import edu.spbu.datacontrol.models.enums.Role;
import edu.spbu.datacontrol.repositories.EventRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
public class UserController {

    UserRepository userRepository;
    EventRepository eventLog;

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
        Event userAddition = new Event(newUser.getId(), EventType.ADD_USER, "New user added");
        eventLog.save(userAddition);

        return "User successfully added.";
    }

    private void assignSupervisor(User user, String supervisorName) throws IllegalArgumentException {
        List<User> possibleSupervisors = userRepository.getUsersByNameAndRole(supervisorName,
            Role.SUPERVISOR);
        if (possibleSupervisors.size() > 1) {
            possibleSupervisors = possibleSupervisors.stream()
                .filter(t -> t.getProject().equals(user.getProject())).toList();
        }

        if (possibleSupervisors.size() > 1) {
            throw new IllegalArgumentException("Cannot find exact user for assigning as supervisor.");
        } else if (possibleSupervisors.size() == 1) {
            user.setSupervisor(possibleSupervisors.get(0));
        }
    }

    private void assignTeamLead(User user, String teamLeadName) throws IllegalArgumentException {
        List<User> possibleTeamLeads = userRepository.getUsersByNameAndRole(teamLeadName,
            Role.TEAM_LEAD);
        if (possibleTeamLeads.size() > 1) {
            possibleTeamLeads = possibleTeamLeads.stream()
                .filter(t -> t.getProject().equals(user.getProject())).toList();
        }

        if (possibleTeamLeads.size() > 1) {
            throw new IllegalArgumentException("Cannot find exact user for assigning as team lead.");
        } else if (possibleTeamLeads.size() == 1) {
            user.setTeamLead(possibleTeamLeads.get(0));
        }
    }

    private void assignProductOwners(User user, List<String> productOwnersNames) {

        List<User> filteredProductOwners = userRepository.getUsersByNameInAndRole(
            productOwnersNames, Role.PRODUCT_OWNER);

        user.setProductOwners(filteredProductOwners);
    }

}
