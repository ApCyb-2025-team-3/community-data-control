package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.GroupInfoDTO;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.repositories.GroupRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> createGroup(@RequestBody GroupInfoDTO groupInfoDTO,
                                              @RequestBody UserDTO teamLeadDTO) {
        try {
            Group newGroup = new Group(groupInfoDTO);

            User teamLead = userRepository.getUserById(teamLeadDTO.getId());
            assignTeamLead(newGroup, teamLead);

            groupRepository.save(newGroup);

        } catch (Exception e) {
            return new ResponseEntity<>(
                e.getMessage(),
                HttpStatus.BAD_REQUEST
            );
        }

        return new ResponseEntity<>("Group successfully created.", HttpStatus.CREATED);
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptUser(@RequestBody GroupInfoDTO groupInfoDTO, @RequestBody UserDTO userDTO) {
        Group currentGroup = groupRepository.getGroupByName(groupInfoDTO.getName());
        try {
            isGroupActive(currentGroup.getName());

            List<User> currentMembers = currentGroup.getMembers();
            currentMembers.add(userRepository.getUserById(userDTO.getId()));

            groupRepository.save(currentGroup);
        }
        catch (IllegalArgumentException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatusCode.valueOf(409));
        }
        return new ResponseEntity<>("User has been successfully added to group " + currentGroup.getName(), HttpStatusCode.valueOf(200));
    }

    private void isGroupActive(String groupName) throws IllegalArgumentException {
        Group currentGroup = groupRepository.getGroupByName(groupName);
        if (!currentGroup.isActive()) {
            throw new IllegalArgumentException("This group isn't active!");
        }
    }

    private void assignTeamLead(Group group, User teamLead) {
        // for this we need to realize applyUser method
        throw new UnsupportedOperationException("Method isn't implemented.");
    }
}
