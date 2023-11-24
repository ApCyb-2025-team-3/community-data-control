package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.*;
import edu.spbu.datacontrol.models.enums.EventType;
import edu.spbu.datacontrol.models.enums.GroupType;
import edu.spbu.datacontrol.models.enums.Role;
import edu.spbu.datacontrol.repositories.GroupRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import edu.spbu.datacontrol.repositories.EventRepository;
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

    private final EventRepository eventLog;

    public GroupController(GroupRepository groupRepository, UserRepository userRepository, EventRepository eventLog) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.eventLog = eventLog;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createGroup(@RequestBody GroupInfoDTO groupInfoDTO,
                                              @RequestBody UserDTO teamLeadDTO) {
        try {
            Group currentGroups = groupRepository.getGroupByName(groupInfoDTO.getName());
            if(currentGroups != null){
                return new ResponseEntity<>("A group with this name already exists!", HttpStatusCode.valueOf(409));
            }
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
    public ResponseEntity<String> acceptUser(@RequestParam UUID groupId, @RequestParam UUID userId) {
        Group group = groupRepository.findById(groupId).orElse(null);
        User newMember = userRepository.findById(userId).orElse(null);
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

    @PatchMapping ("/update")
    public  ResponseEntity<String> updateGroup(@RequestBody GroupDTO changedGroup) {
        Group group = groupRepository.findById(changedGroup.getId()).orElse(null);
        if (group != null) {
            group.changeGroupData(changedGroup);
            User teamLead = userRepository.getUserById(changedGroup.getTeamLead());
            assignTeamLead(group, teamLead);
            groupRepository.save(group);

            return new ResponseEntity<>("Group was successfully modified",
                    HttpStatusCode.valueOf(200));
        }

        return new ResponseEntity<>("This group doesn't exist", HttpStatusCode.valueOf(404));
    }

    @GetMapping("/getActiveGroups")
    public ResponseEntity<List<GroupDTO>> getActiveGroup() {

        return new ResponseEntity<>(
                groupRepository.getGroupsByIsActiveTrue().stream()
                        .map(GroupDTO::new)
                        .toList(), HttpStatusCode.valueOf(200));

    }

    @GetMapping("getUserGroups")
    public ResponseEntity<List<GroupDTO>> getUserGroups(@RequestParam UUID userId) {
        User user = userRepository.getUserById(userId);
        return new ResponseEntity<>(groupRepository.getGroupsByMembersContains(user)
                .stream().map(GroupDTO::new).toList(), HttpStatusCode.valueOf(200));
    }

    @GetMapping("getActiveMembers")
    public ResponseEntity<List<UserDTO>> getActiveMembers(@RequestParam UUID groupId) {
        Group group = groupRepository.findById(groupId).orElse(null);
        return new ResponseEntity<>(userRepository.getUsersByGroupsContainsAndIsActiveTrue(group)
                .stream().map(UserDTO::new).toList(), HttpStatusCode.valueOf(200));
    }

    @PatchMapping("/exclude")
    public ResponseEntity<String> excludeUser(@RequestParam UUID groupId, @RequestParam UUID userId) {
        Group group = groupRepository.findById(groupId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        if (group == null) {
            return new ResponseEntity<>("This group hasn't been found", HttpStatusCode.valueOf(404));
        }
        if (!group.isActive()) {
            return new ResponseEntity<>("This group isn't active!", HttpStatusCode.valueOf(409));
        }
        List<User> groupMembers = group.getMembers();
        if (!groupMembers.contains(user)) {
            return new ResponseEntity<>("The user isn't member of this group!", HttpStatusCode.valueOf(409));
        }
        if (user.getId() == group.getTeamLead().getId()) {
            return new ResponseEntity<>("This user is team leader, you can't exclude him!", HttpStatusCode.valueOf(409));
        }
        user.getGroups().remove(group);
        groupMembers.remove(user);
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
        User previousTeamLead = group.getTeamLead();
        previousTeamLead.setRole(Role.DEVELOPER);
        userRepository.save(previousTeamLead);
        Event revokeTeamLeadRole = new Event(previousTeamLead.getId(), EventType.CHANGE_PERSONAL_DATA, "Role of a team leader has been revoked");
        eventLog.save(revokeTeamLeadRole);

        teamLead.setRole(Role.TEAM_LEAD);
        userRepository.save(teamLead);
        Event assignTeamLeadRole = new Event(teamLead.getId(), EventType.CHANGE_PERSONAL_DATA, "This user is new team leader");
        eventLog.save(assignTeamLeadRole);

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
