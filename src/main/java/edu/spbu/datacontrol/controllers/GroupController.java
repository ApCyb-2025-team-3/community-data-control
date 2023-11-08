package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.models.enums.EnumUtils;
import edu.spbu.datacontrol.models.enums.GroupType;
import edu.spbu.datacontrol.repositories.GroupRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    private final GroupRepository groupRepository;

    private final UserRepository userRepository;

    public GroupController(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createGroup(@RequestParam String name, @RequestParam String type,
                                              @RequestParam String description, @RequestBody UserDTO teamLeadDTO) {
        try {
            GroupType groupType = EnumUtils.fromString(GroupType.class, type);
            Group newGroup = new Group(name, groupType, description);

            User teamLead = userRepository.getUserById(teamLeadDTO.getId());
            assignTeamLead(newGroup, teamLead);

            groupRepository.save(newGroup);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                "Probably, it isn't possible to assign a given user as a team leader",
                HttpStatus.BAD_REQUEST
            );
        }

        return new ResponseEntity<>("Group successfully created.", HttpStatus.CREATED);
    }

    private void assignTeamLead(Group group, User teamLead) throws IllegalArgumentException {
        // for this we need to realize applyUser method
    }
}
