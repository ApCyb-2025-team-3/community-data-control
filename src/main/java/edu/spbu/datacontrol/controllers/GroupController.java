package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.GroupType;
import edu.spbu.datacontrol.repositories.GroupRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    private final GroupRepository groupRepository;

    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createGroup(@RequestParam String name, @RequestParam String type,
                                             @RequestParam String description, @RequestBody User teamLead) {
        try {
            GroupType groupType = GroupType.valueOf(type);
            Group newGroup = new Group(name, groupType, description);

            assignTeamLead(newGroup, teamLead);
            groupRepository.save(newGroup);

            return new ResponseEntity<>("Group successfully created.", HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                "Probably, it isn't possible to assign a given user as a team leader",
                HttpStatusCode.valueOf(404)
            );
        }
    }

    public void assignTeamLead(Group group, User teamLead) throws IllegalArgumentException {
        // for this we need to realize applyUser method
    }
}
