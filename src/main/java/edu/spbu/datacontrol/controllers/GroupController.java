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

import java.util.Date;
import java.util.List;
import java.util.UUID;

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
        Group group = groupRepository.getGroupByName(groupInfoDTO.getName());
        if (!group.isActive()) {
            return new ResponseEntity<>("This group isn't active!", HttpStatusCode.valueOf(409));
        }

        List<User> currentMembers = group.getMembers();
        currentMembers.add(userRepository.getUserById(userDTO.getId()));
        groupRepository.save(group);

        return new ResponseEntity<>("User has been successfully added to group " + group.getName(), HttpStatusCode.valueOf(200));
    }

    @PatchMapping ("/disband")
    public ResponseEntity<String> disbandGroup(@RequestParam UUID groupId,
                                               @RequestParam String disbandmentReason) {

        Group disbandedGroup = groupRepository.findById(groupId).orElse(null);

        if (disbandedGroup != null) {

            Date disbandmentDate = new Date();
            disbandedGroup.setDisbandmentDate(disbandmentDate);
            disbandedGroup.setDisbandmentReason(disbandmentReason);
            disbandedGroup.setActive(false);
            disbandedGroup.setTeamLead(null);
            dismissGroupMembers(disbandedGroup);
            groupRepository.save(disbandedGroup);
            return new ResponseEntity<>("Group was successfully disbanded",
                    HttpStatusCode.valueOf(200));

        }
        return new ResponseEntity<>("This group doesn't found", HttpStatusCode.valueOf(404));

    }

    private void assignTeamLead(Group group, User teamLead) {
        // for this we need to realize applyUser method
        throw new UnsupportedOperationException("Method isn't implemented.");
    }

    private void dismissGroupMembers(Group group) {
        // for this we need to realize applyUser method
        throw new UnsupportedOperationException("Method isn't implemented.");
    }
}
