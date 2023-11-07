package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.GroupType;
import edu.spbu.datacontrol.repositories.GroupRepository;
import java.util.List;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    private GroupRepository groupRepository;

    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @PostMapping("/create")
    public String createGroup(GroupType type, String name, String description, User teamLead) {

        Group newGroup = new Group(type, name, description, teamLead);
        this.assignTeamLead(newGroup, teamLead);
        try {
            this.assignTeamLead(newGroup, teamLead);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(409), e.getMessage());
        }

        newGroup = groupRepository.save(newGroup);

        return "Group successfully created.";
    }

    public void assignTeamLead(Group group, User teamLead) {

    }
}
