package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.*;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.EventRepository;
import edu.spbu.datacontrol.repositories.GroupRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.test.util.AssertionErrors.assertEquals;


public class GroupControllerTest {
    @Test
    public void isUpdateComplete() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);
        Group testGroup = new Group(groupInfo);
        UUID groupId = testGroup.getId();
        testGroup.setTeamLead(teamLead1);
        testGroup.getMembers().add(teamLead1);
        testGroup.setActive(true);

        teamLead1.getGroups().add(testGroup);

        User teamLead2 = new User();
        UUID uuidUser2 = teamLead2.getId();
        teamLead2.setGroups(new ArrayList<>());

        Mockito.when(mockUserRepository.getUserById(uuidUser2)).thenReturn(teamLead2);
        Mockito.when(mockGroupRepository.getGroupById(groupId)).thenReturn(testGroup);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO(groupId, "Test2", "update", uuidUser2));

        String checkName = testGroup.getName();
        String checkDescription = testGroup.getDescription();
        User checkTeamLead = testGroup.getTeamLead();

        assertEquals("", "Group was successfully modified", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
        assertEquals("", "Test2", checkName);
        assertEquals("", "update", checkDescription);
        assertEquals("", teamLead2, checkTeamLead);
    }

    @Test
    public void cantChangedToAnAlreadyAssignedTeamLead() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);
        Group testGroup = new Group(groupInfo);
        UUID groupId = testGroup.getId();
        testGroup.setTeamLead(teamLead1);
        testGroup.getMembers().add(teamLead1);
        testGroup.setActive(true);

        teamLead1.getGroups().add(testGroup);


        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockGroupRepository.getGroupById(groupId)).thenReturn(testGroup);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO(groupId, "Test2", "update", uuidUser));

        assertEquals("", "This user is in a work team already!", response.getBody());
    }

    @Test
    public void cantChangedGroupThatDoesNotExist() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);


        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupById(null)).thenReturn(null);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO(null, "543", "%", null));

        assertEquals("", "This group doesn't exist", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(404), response.getStatusCode());
    }

    @Test
    public void dontHaveToChangeTeamLeadAndEmptyFields() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);
        Group testGroup = new Group(groupInfo);
        UUID groupId = testGroup.getId();
        testGroup.setTeamLead(teamLead1);
        testGroup.getMembers().add(teamLead1);
        testGroup.setActive(true);

        teamLead1.getGroups().add(testGroup);

        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupById(groupId)).thenReturn(testGroup);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO(groupId, null, null, null));

        assertEquals("", "Test1", testGroup.getName());
        assertEquals("", null, testGroup.getDescription());
        assertEquals("", teamLead1, testGroup.getTeamLead());
    }

    @Test
    public void cantUpdateDisbandedGroup() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);
        Group testGroup = new Group(groupInfo);
        UUID groupId = testGroup.getId();
        testGroup.setTeamLead(teamLead1);
        testGroup.getMembers().add(teamLead1);
        testGroup.setActive(true);

        teamLead1.getGroups().add(testGroup);

        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupById(groupId)).thenReturn(testGroup);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> disband = groupController.disbandGroup(groupId, "testing");
        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO(groupId, "543", "%", null));

        assertEquals("", "This group is inactive", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
    }

    @Test
    public void canCreateGroup() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);


        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupByName("Test1")).thenReturn(null);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.createGroup(groupInfo, uuidUser);

        assertEquals("", "Group successfully created.", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(201), response.getStatusCode());
    }

    @Test
    public void cantCreateGroupWithoutName() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("  ", "WORKING_TEAM", null);


        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupByName(null)).thenReturn(null);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.createGroup(groupInfo, uuidUser);

        assertEquals("", "The group should have a name!", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
    }

    @Test
    public void cantCreateGroupWithExistingName() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);
        Group testGroup = new Group(groupInfo);
        UUID groupId = testGroup.getId();
        testGroup.setTeamLead(teamLead1);
        testGroup.getMembers().add(teamLead1);
        testGroup.setActive(true);

        teamLead1.getGroups().add(testGroup);


        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupByName("Test1")).thenReturn(testGroup);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.createGroup(groupInfo, uuidUser);

        assertEquals("", "A group by that name already exists!", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
    }

    @Test
    public void canDisbandSuccessfully() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);
        Group testGroup = new Group(groupInfo);
        UUID groupId = testGroup.getId();
        testGroup.setTeamLead(teamLead1);
        testGroup.getMembers().add(teamLead1);
        testGroup.setActive(true);

        teamLead1.getGroups().add(testGroup);


        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockGroupRepository.getGroupById(groupId)).thenReturn(testGroup);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.disbandGroup(groupId, "Testing");

        assertEquals("", "Group was successfully disbanded.", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
        assertEquals("", "Testing", testGroup.getDisbandmentReason());
        assertEquals("", null, testGroup.getTeamLead());
        assertEquals("", false, testGroup.isActive());
        assertEquals("", new ArrayList<>(), testGroup.getMembers());
    }

    @Test
    public void cantDisbandAlreadyDisbandedGroup() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);
        Group testGroup = new Group(groupInfo);
        UUID groupId = testGroup.getId();
        testGroup.setTeamLead(teamLead1);
        testGroup.getMembers().add(teamLead1);
        testGroup.setActive(true);

        teamLead1.getGroups().add(testGroup);


        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupById(groupId)).thenReturn(testGroup);
        Mockito.when(mockGroupRepository.getGroupByName("Test1")).thenReturn(testGroup);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.disbandGroup(groupId, "Testing");
        ResponseEntity<String> response2 = groupController.disbandGroup(groupId, "Testing2");

        assertEquals("", "Group was successfully disbanded.", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
        assertEquals("", "This group has already been disbanded.", response2.getBody());
        assertEquals("", HttpStatusCode.valueOf(409), response2.getStatusCode());
    }

    @Test
    public void cantDisbandNotExistingGroup() throws Exception {
        GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
        UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
        EventRepository mockEventLog = Mockito.mock(EventRepository.class);

        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository, mockEventLog);

        ResponseEntity<String> response = groupController.disbandGroup(null, "Testing");

        assertEquals("", "This group hasn't been found.", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(404), response.getStatusCode());
    }
}
