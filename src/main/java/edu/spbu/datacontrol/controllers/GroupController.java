package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.GroupInfoDTO;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.models.enums.GroupType;
import edu.spbu.datacontrol.models.enums.Role;
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

    @PatchMapping("/accept")
    public ResponseEntity<String> acceptUser(@RequestBody GroupInfoDTO groupInfoDTO, @RequestBody UserDTO userDTO) {
        //Чет так подумал, тут же и для юзера, и для группы, можно чисто ID запрашивать в качестве параметров.
        //Как мы вообще определяем, когда DTO класс передаем, а когда ID?
        Group group = groupRepository.getGroupByName(groupInfoDTO.getName());
        User newMember = userRepository.getUserById(userDTO.getId());
        if (group == null) {
            return new ResponseEntity<>("This group hasn't been found", HttpStatusCode.valueOf(404));
        }
        if (!group.isActive()) {
            return new ResponseEntity<>("This group isn't active!", HttpStatusCode.valueOf(409));
        }

        List<User> currentMembers = group.getMembers();
        if(currentMembers.contains(newMember)) {
            return new ResponseEntity<>("This user is already in the group!", HttpStatusCode.valueOf(409));
        }
        currentMembers.add(newMember);
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
        return new ResponseEntity<>("This group hasn't been found", HttpStatusCode.valueOf(404));

    }

    @PatchMapping("/exclude")
    public ResponseEntity<String> excludeUser(@RequestBody UserDTO userDTO, @RequestBody GroupInfoDTO groupInfoDTO) {
        //Тут тот же самый вопрос
        Group group = groupRepository.getGroupByName(groupInfoDTO.getName());
        User user = userRepository.getUserById(userDTO.getId());
        if (group == null || !group.isActive()) {
            return new ResponseEntity<>("This group hasn't been found", HttpStatusCode.valueOf(404));
        }
        List<User> groupMembers = group.getMembers();
        if (!groupMembers.contains(user)) {
            return new ResponseEntity<>("The user isn't member of this group!", HttpStatusCode.valueOf(409));
        }
        user.getGroups().remove(group);
        groupMembers.remove(user);
        //Надо ли здесь проверять, не последний ли это член?
        //Если да, то вызывать disbandGroup или просто ставить, что она неактивна?
        userRepository.save(user);
        groupRepository.save(group);

        return new ResponseEntity<>("The user has been excluded from this group", HttpStatusCode.valueOf(200));
    }

    private void assignTeamLead(Group group, User teamLead) throws IllegalArgumentException {
        List<User> currentMembers = group.getMembers();
        if (group.getType() == GroupType.WORKING_TEAM && isInWorkTeam(teamLead)) {
            throw new IllegalArgumentException("This user is in a work team already!");
        }
        if (!currentMembers.contains(teamLead)) {
            currentMembers.add(teamLead);
        }
        group.setTeamLead(teamLead);
    }

    private boolean isInWorkTeam (User user) {
        List<Group> userGroups = user.getGroups();
        for (Group group : userGroups) {
            if (group.getType() == GroupType.WORKING_TEAM) {
                return true;
            }
        }
        return false;
    }

    private void dismissGroupMembers(Group group) {
        List<User> members = group.getMembers();
        for (User member : members) {
            member.getGroups().remove(group);
        }
        members.clear();
    }
}
