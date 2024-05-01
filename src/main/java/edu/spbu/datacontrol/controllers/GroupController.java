package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.*;
import edu.spbu.datacontrol.models.enums.EnumUtils;
import edu.spbu.datacontrol.models.enums.EventType;
import edu.spbu.datacontrol.models.enums.GroupType;
import edu.spbu.datacontrol.models.enums.Role;
import edu.spbu.datacontrol.repositories.GroupRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import edu.spbu.datacontrol.repositories.EventRepository;
import java.util.stream.StreamSupport;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.time.LocalDate;

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
                                              @RequestParam UUID teamLeadId) {
        try {
            Group currentGroups = groupRepository.getGroupByName(groupInfoDTO.getName());
            if(currentGroups != null){
                return new ResponseEntity<>("A group by that name already exists!", HttpStatusCode.valueOf(409));
            }
            Group newGroup = new Group(groupInfoDTO);
            if(newGroup.getName().isBlank()) {
                return new ResponseEntity<>("The group should have a name!", HttpStatusCode.valueOf(409));
            }
                User teamLead = userRepository.getUserById(teamLeadId);
                assignTeamLead(newGroup, teamLead);
                groupRepository.save(newGroup);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                e.getMessage(),
                HttpStatus.BAD_REQUEST
            );
        }

        return new ResponseEntity<>("Group successfully created.", HttpStatus.CREATED);
    }

    @PatchMapping("/accept")
    public ResponseEntity<String> acceptUser(@RequestParam UUID groupId, @RequestParam UUID userId) {
        Group group = groupRepository.getGroupById(groupId);
        User newMember = userRepository.getUserById(userId);
        if (group == null) {
            return new ResponseEntity<>("This group hasn't been found", HttpStatusCode.valueOf(404));
        }
        if (!group.isActive()) {
            return new ResponseEntity<>("This group isn't active!", HttpStatusCode.valueOf(409));
        }

        List<User> currentMembers = group.getMembers();
        if(currentMembers.contains(newMember)) {
            return new ResponseEntity<>("The user is already in this group!", HttpStatusCode.valueOf(409));
        }

        if (group.getType() == GroupType.WORKING_TEAM && isInWorkTeam(newMember)) {
            return new ResponseEntity<>("This user is already in the working team!", HttpStatusCode.valueOf(409));
        }
        currentMembers.add(newMember);
        groupRepository.save(group);

        newMember.getGroups().add(group);
        userRepository.save(newMember);

        Event addUser = new Event(userId, EventType.ACCEPT_TO_GROUP, LocalDate.now(),"Accepted the user to " + group.getName() + " group");
        eventLog.save(addUser);

        return new ResponseEntity<>("User has been successfully added to group " + group.getName(), HttpStatusCode.valueOf(200));

    }

    @PatchMapping ("/disband")
    public ResponseEntity<String> disbandGroup(@RequestParam UUID groupId,
                                               @RequestParam String disbandmentReason) {

        Group disbandedGroup = groupRepository.getGroupById(groupId);

        if (disbandedGroup == null) return new ResponseEntity<>("This group hasn't been found.", HttpStatusCode.valueOf(404));

            if(!disbandedGroup.isActive()) {
                return new ResponseEntity<>("This group has already been disbanded.", HttpStatusCode.valueOf(409));
            }
            Date disbandmentDate = new Date();
            disbandedGroup.setDisbandmentDate(disbandmentDate);
            disbandedGroup.setDisbandmentReason(disbandmentReason);
            disbandedGroup.setActive(false);
            disbandedGroup.setTeamLead(null);
            dismissGroupMembers(disbandedGroup);
            groupRepository.save(disbandedGroup);
            return new ResponseEntity<>("Group was successfully disbanded.",
                    HttpStatusCode.valueOf(200));

    }

    @PatchMapping ("/update")
    public  ResponseEntity<String> updateGroup(@RequestBody ModifiedGroupDTO changedGroup) {
        Group group = groupRepository.getGroupById(changedGroup.getId());
        if (group == null) {
            return new ResponseEntity<>("This group doesn't exist", HttpStatusCode.valueOf(404));
        }
        if (!group.isActive()) return new ResponseEntity<>("This group is inactive", HttpStatusCode.valueOf(409));
        try {
            User teamLead = userRepository.getUserById(changedGroup.getTeamLead());
            assignTeamLead(group, teamLead);
            group.changeGroupData(changedGroup);
            groupRepository.save(group);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Group was successfully modified",
                    HttpStatusCode.valueOf(200));

    }

    @GetMapping("/getActiveGroups")
    public ResponseEntity<List<GroupDTO>> getActiveGroup() {

        return new ResponseEntity<>(
                groupRepository.getGroupsByIsActiveTrue().stream()
                        .map(GroupDTO::new)
                        .toList(), HttpStatusCode.valueOf(200));

    }

    @GetMapping("/getActiveGroupsByType")
    public ResponseEntity<List<GroupDTO>> getActiveGroupsByType(@RequestParam String groupType) {

        try {
            GroupType type = EnumUtils.fromString(GroupType.class, groupType);
            return new ResponseEntity<>(
                groupRepository.getGroupsByTypeAndIsActiveTrue(type)
                    .stream()
                    .map(GroupDTO::new)
                    .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }

    }

    @GetMapping("/getAllGroups")
    public ResponseEntity<List<GroupDTO>> getAllGroups() {

        List<Group> groups = StreamSupport.stream(groupRepository.findAllByOrderByIsActiveDesc().spliterator(), false).toList();
        return new ResponseEntity<>(
            groups.stream().map(GroupDTO::new).toList(), HttpStatusCode.valueOf(200));

    }

    @GetMapping("/getGroupsByType")
    public ResponseEntity<List<GroupDTO>> getGroupsByType(@RequestParam String groupType) {
        try {
            GroupType type = EnumUtils.fromString(GroupType.class, groupType);
            return new ResponseEntity<>(
                groupRepository.getGroupsByTypeOrderByIsActiveDesc(type)
                    .stream()
                    .map(GroupDTO::new)
                    .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }

    }

    @GetMapping("getUserGroups")
    public ResponseEntity<List<GroupDTO>> getUserGroups(@RequestParam UUID userId) {
        User user = userRepository.getUserById(userId);
        return new ResponseEntity<>(groupRepository.getGroupsByMembersContains(user)
                .stream().map(GroupDTO::new).toList(), HttpStatusCode.valueOf(200));
    }

    @GetMapping("getUserGroupsByType")
    public ResponseEntity<List<GroupDTO>> getUserGroups(@RequestParam UUID userId, @RequestParam String groupType) {
        try {
            User user = userRepository.getUserById(userId);
            GroupType type = EnumUtils.fromString(GroupType.class, groupType);
            return new ResponseEntity<>(
                groupRepository.getGroupsByMembersContainsAndType(user, type)
                    .stream()
                    .map(GroupDTO::new)
                    .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }
    }

    @GetMapping("/getGroupsByPartialName")
    public ResponseEntity<List<GroupDTO>> getGroupsByPartialName(@RequestParam String partialName) {

        if (!partialName.isBlank()) {
            return new ResponseEntity<>(
                    groupRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(partialName).stream()
                            .map(GroupDTO::new)
                            .toList(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }

    @GetMapping("/getGroupsByPartialNameAndType")
    public ResponseEntity<List<GroupDTO>> getGroupsByPartialNameAndType(@RequestParam String partialName, @RequestParam String groupType) {

        try {
            GroupType type = EnumUtils.fromString(GroupType.class, groupType);
            if (!partialName.isBlank()) {
                return new ResponseEntity<>(
                    groupRepository.findByNameContainingIgnoreCaseAndType(partialName, type)
                        .stream()
                        .map(GroupDTO::new)
                        .toList(), HttpStatus.OK);
            }
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }
    }

    @GetMapping("getActiveMembers")
    public ResponseEntity<List<UserDTO>> getActiveMembers(@RequestParam UUID groupId) {
        Group group = groupRepository.getGroupById(groupId);
        return new ResponseEntity<>(groupActiveMembers(group)
                .stream().map(UserDTO::new).toList(), HttpStatusCode.valueOf(200));
    }

    @PatchMapping("/exclude")
    public ResponseEntity<String> excludeUser(@RequestParam UUID groupId, @RequestParam UUID userId) {
        Group group = groupRepository.getGroupById(groupId);
        User user = userRepository.getUserById(userId);
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

        Event excludeUser = new Event(userId, EventType.EXCLUDE_FROM_GROUP, LocalDate.now(),"Excluded the user from the " + group.getName() + " group");
        eventLog.save(excludeUser);

        return new ResponseEntity<>("The user has been excluded from this group", HttpStatusCode.valueOf(200));
    }

    private void assignTeamLead(Group group, User teamLead) throws IllegalArgumentException {
        if (teamLead == null) return;
            List<User> currentMembers = group.getMembers();
            if (group.getType() == GroupType.WORKING_TEAM && isInWorkTeam(teamLead)) {
                throw new IllegalArgumentException("This user is in a work team already!");
            }
            if (!currentMembers.contains(teamLead)) {
                currentMembers.add(teamLead);
            }
            User previousTeamLead = group.getTeamLead();
            if (previousTeamLead != null) {
                previousTeamLead.setRole(Role.DEVELOPER);
                userRepository.save(previousTeamLead);
                Event revokeTeamLeadRole = new Event(previousTeamLead.getId(), EventType.CHANGE_PERSONAL_DATA, "Role of a team leader has been revoked");
                eventLog.save(revokeTeamLeadRole);
            }

            teamLead.setRole(Role.TEAM_LEAD);
            teamLead.getGroups().add(group);
            userRepository.save(teamLead);
            Event assignTeamLeadRole = new Event(teamLead.getId(), EventType.CHANGE_PERSONAL_DATA, LocalDate.now(), "This user is new team leader");
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

    private List<User> groupActiveMembers(Group group) {
        List<User> allMembers = group.getMembers();
        List<User> activeMembers = new ArrayList<>();
        for (User member : allMembers) {
            if (member.isActive()) {
                activeMembers.add(member);
            }
        }
        return activeMembers;
    }
}
