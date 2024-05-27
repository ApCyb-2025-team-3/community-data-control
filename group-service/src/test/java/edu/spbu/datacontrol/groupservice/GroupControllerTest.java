package edu.spbu.datacontrol.groupservice;


import edu.spbu.datacontrol.commons.Group;
import edu.spbu.datacontrol.commons.GroupInfoDTO;
import edu.spbu.datacontrol.commons.ModifiedGroupDTO;
import edu.spbu.datacontrol.commons.User;
import edu.spbu.datacontrol.commons.EventClient;
import edu.spbu.datacontrol.groupservice.repositories.GroupRepository;
import edu.spbu.datacontrol.groupservice.repositories.UserRepository;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import static org.springframework.test.util.AssertionErrors.assertEquals;


public class GroupControllerTest {
    GroupRepository mockGroupRepository = Mockito.mock(GroupRepository.class);
    UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
    EventClient mockEventLog = Mockito.mock(EventClient.class);

    @Test
    public void isUpdateComplete() throws Exception {
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
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO("Test2","update", uuidUser2), groupId, new Date());

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
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO("Test2", "update", uuidUser), groupId, new Date());

        assertEquals("", "This user is in a work team already!", response.getBody());
    }

    @Test
    public void cantChangedGroupThatDoesNotExist() throws Exception {
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupById(null)).thenReturn(null);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO("543", "%", null), null, new Date());

        assertEquals("", "This group doesn't exist", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(404), response.getStatusCode());
    }

    @Test
    public void dontHaveToChangeTeamLeadAndEmptyFields() throws Exception {
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
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO(null, null, null), groupId, new Date());

        assertEquals("", "Test1", testGroup.getName());
        assertEquals("", null, testGroup.getDescription());
        assertEquals("", teamLead1, testGroup.getTeamLead());
    }

    @Test
    public void cantUpdateDisbandedGroup() throws Exception {
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
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> disband = groupController.disbandGroup(groupId, "testing", new Date());
        ResponseEntity<String> response = groupController.updateGroup(new ModifiedGroupDTO("543", "%", null), groupId, new Date());

        assertEquals("", "This group is inactive", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
    }

    @Test
    public void canCreateGroup() throws Exception {
        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("Test1", "WORKING_TEAM", null);

        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupByName("Test1")).thenReturn(null);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.createGroup(groupInfo, uuidUser, new Date());

        assertEquals("", "Group successfully created.", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(201), response.getStatusCode());
    }

    @Test
    public void cantCreateGroupWithoutName() throws Exception {
        User teamLead1 = new User();
        UUID uuidUser = teamLead1.getId();
        teamLead1.setGroups(new ArrayList<>());

        GroupInfoDTO groupInfo = new GroupInfoDTO("  ", "WORKING_TEAM", null);


        Mockito.when(mockUserRepository.getUserById(uuidUser)).thenReturn(teamLead1);
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        Mockito.when(mockGroupRepository.getGroupByName(null)).thenReturn(null);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.createGroup(groupInfo, uuidUser, new Date());

        assertEquals("", "The group should have a name!", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
    }

    @Test
    public void cantCreateGroupWithExistingName() throws Exception {
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
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.createGroup(groupInfo, uuidUser, new Date());

        assertEquals("", "A group by that name already exists!", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
    }

    @Test
    public void canDisbandSuccessfully() throws Exception {
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
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.disbandGroup(groupId, "Testing", new Date());

        assertEquals("", "Group was successfully disbanded.", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
        assertEquals("", "Testing", testGroup.getDisbandmentReason());
        assertEquals("", null, testGroup.getTeamLead());
        assertEquals("", false, testGroup.isActive());
        assertEquals("", new ArrayList<>(), testGroup.getMembers());
    }

    @Test
    public void cantDisbandAlreadyDisbandedGroup() throws Exception {
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
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.disbandGroup(groupId, "Testing", new Date());
        ResponseEntity<String> response2 = groupController.disbandGroup(groupId, "Testing2", new Date());

        assertEquals("", "Group was successfully disbanded.", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
        assertEquals("", "This group has already been disbanded.", response2.getBody());
        assertEquals("", HttpStatusCode.valueOf(409), response2.getStatusCode());
    }

    @Test
    public void cantDisbandNotExistingGroup() throws Exception {
        Mockito.when(mockUserRepository.getUserById(null)).thenReturn(null);
        GroupController groupController = new GroupController(mockGroupRepository, mockUserRepository);

        ResponseEntity<String> response = groupController.disbandGroup(null, "Testing", new Date());

        assertEquals("", "This group hasn't been found.", response.getBody());
        assertEquals("", HttpStatusCode.valueOf(404), response.getStatusCode());
    }
}
