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

    @PatchMapping ("/disband")
    public ResponseEntity<String> disbandGroup(@RequestBody Group groupInfoDTO) {

        if (groupInfoDTO.isActive() != true || groupInfoDTO == null) {//тут не совсем уверен начсет такого условия
            return new ResponseEntity<>("This group doesn't exist", HttpStatusCode.valueOf(404));
        } else {
            groupInfoDTO.setActive(false);
            groupInfoDTO.setName(null);
            groupInfoDTO.setType(null);
            groupInfoDTO.setDescription(null);

            groupRepository.save(groupInfoDTO);

            return new ResponseEntity<>("Group was successfully disbanded",
                    HttpStatusCode.valueOf(200));
        }
    }

    private void assignTeamLead(Group group, User teamLead) {
        // for this we need to realize applyUser method
        throw new UnsupportedOperationException("Method isn't implemented.");
    }
}
