package edu.spbu.datacontrol.controllers;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.StdDateFormat;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import edu.spbu.datacontrol.models.UserAdditionDTO;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.models.UserDataChangeDTO;
import edu.spbu.datacontrol.models.UserInfoDTO;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;

import java.time.LocalDate;
import java.util.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureEmbeddedDatabase
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(
            new JavaTimeModule()).setDateFormat(new StdDateFormat().withColonInTimeZone(true));

    @Test
    void addUserTest() throws Exception {

        UserAdditionDTO userData = generateSimpleUser();

        addUser(userData);
    }

    @Test
    void dismissUserTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        addUser(user);

        String usersListJson = this.mockMvc.perform(
                get("/api/user/getUsersByRole").param("role", user.getRole())
        ).andReturn().getResponse().getContentAsString();

        List<UserDTO> usersList = objectMapper.readValue(usersListJson,
                new TypeReference<>() {}
        );
        UUID id = usersList.get(0).getId();

        String description = "Testing dismiss";
        String response = this.mockMvc.perform(
                        post("/api/user/" + id.toString() + "/dismiss")
                                .param("description", description))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        assertEquals("User was successfully dismissed", response);
    }

    @Test
    void getDismissedUserByRoleAndGradeTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        addUser(user);

        UUID userId = getUserId(user);

        this.mockMvc.perform(post("/api/user/" + userId.toString() + "/dismiss")
                .param("description", "For testing purpose.")
        ).andExpect(status().isOk());

        String usersListJson = this.mockMvc.perform(
                get("/api/user/getUsersByRole").param("role", user.getRole())
        ).andReturn().getResponse().getContentAsString();
        List<UserDTO> result = objectMapper.readValue(usersListJson, new TypeReference<>() {});
        assertTrue(result.stream().noneMatch(t -> t.getId().equals(userId)));

        usersListJson = this.mockMvc.perform(
                get("/api/user/getUsersByGrade").param("grade", user.getGrade())
        ).andReturn().getResponse().getContentAsString();
        result = objectMapper.readValue(usersListJson, new TypeReference<>() {});
        assertTrue(result.stream().noneMatch(t -> t.getId().equals(userId)));
    }

    @Test
    void getUsersBySupervisorIdTest() throws Exception {

        UserAdditionDTO supervisor = generateSimpleUser();
        supervisor.setRole("supervisor");
        UserAdditionDTO subordinate = generateSimpleUser();
        subordinate.setSupervisorName(supervisor.getName());

        addUser(supervisor);

        UserDTO expected = new UserDTO();
        expected.setProject(subordinate.getProject());
        expected.setName(subordinate.getName());
        expected.setEmail(subordinate.getEmail());
        expected.setDepartment(subordinate.getDepartment());

        addUser(subordinate);

        UUID supervisorId = getUserId(supervisor);

        String usersListJson = this.mockMvc.perform(
                get("/api/user/getUsersBySupervisorId").param("supervisorId", supervisorId.toString())
        ).andReturn().getResponse().getContentAsString();

        List<UserDTO> usersList = objectMapper.readValue(usersListJson, new TypeReference<>() {});
        assertTrue(usersList.stream().anyMatch(u -> u.getName().equals(expected.getName())));
        assertTrue(usersList.stream().anyMatch(u -> u.getEmail().equals(expected.getEmail())));
        assertTrue(usersList.stream().anyMatch(u -> u.getDepartment().equals(expected.getDepartment())));
        assertTrue(usersList.stream().anyMatch(u -> u.getProject().equals(expected.getProject())));
    }


    @Test
    void getUsersByRoleTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("role", user.getRole());
        getEndpointTest("getUsersByRole", user, params);
    }

    @Test
    void getUsersByGradeTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grade", user.getGrade());
        getEndpointTest("getUsersByGrade", user, params);
    }

    @Test
    void getUsersByDepartmentTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("department", user.getDepartment());
        getEndpointTest("getUsersByDepartment", user, params);
    }

    @Test
    void getUsersByProjectTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        user.setProject("TestProject");
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("project", user.getProject());
        getEndpointTest("getUsersByProject", user, params);
    }

    @Test
    void getUserByIdTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        addUser(user);

        UUID userId = getUserId(user);
        UserDTO result = getUserById(userId);

        assertEquals(userId, result.getId());
        assertEquals(user.getName(), result.getName());
        assertEquals(user.getEmail(), result.getEmail());
        assertEquals(user.getProject(), result.getProject());
        assertEquals(user.getDepartment(), result.getDepartment());
        assertEquals(user.getRole(), result.getRole());
        assertEquals(user.getGrade(), result.getGrade());
    }

    @Test
    void changePersonalDataTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        addUser(user);

        UUID userId = getUserId(user);

        UserDataChangeDTO newUserData = new UserDataChangeDTO();
        newUserData.setUserId(userId);
        newUserData.setEmail("not_an_email");
        String json = objectMapper.writeValueAsString(newUserData);

        this.mockMvc.perform(
                post("/api/user/changeUsersPersonalData")
                        .param("reason", "test")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json)
        ).andExpect(status().isOk());

        UserDTO result = getUserById(userId);
        assertEquals(user.getName(), result.getName());
        assertEquals(newUserData.getEmail(), result.getEmail());
        assertEquals(user.getDepartment(), result.getDepartment());
    }

    @Test
    void getDismissedUsersTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        addUser(user);

        UUID userId = getUserId(user);
        this.mockMvc.perform(post("/api/user/" + userId.toString() + "/dismiss")
                .param("description", "For testing purpose.")
        ).andExpect(status().isOk());

        String usersListJson = this.mockMvc.perform(
                get("/api/user/getDismissedUsers")).andReturn().getResponse().getContentAsString();

        List<UserDTO> usersList = objectMapper.readValue(usersListJson, new TypeReference<>() {});

        assertTrue(usersList.stream().anyMatch(u -> u.getName().equals(user.getName())));
    }

    @Test
    void getFullUserInfoTest() throws Exception {

        UserAdditionDTO supervisor = generateSimpleUser();
        supervisor.setRole("Supervisor");
        addUser(supervisor);

        UserAdditionDTO user = generateSimpleUser();
        user.setSupervisorName(supervisor.getName());
        addUser(user);

        UUID userId = getUserId(user);
        String userJson = this.mockMvc.perform(
                get("/api/user/" + userId.toString() + "/fullInfo")
        ).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        UserInfoDTO result = objectMapper.readValue(userJson, UserInfoDTO.class);
        assertEquals(userId, result.getId());
        assertEquals(user.getName(), result.getName());
        assertEquals(user.getEmail(), result.getEmail());
        assertEquals(user.getProject(), result.getProject());
        assertEquals(user.getDepartment(), result.getDepartment());
        assertEquals(user.getRole(), result.getRole());
        assertEquals(user.getGrade(), result.getGrade());
        assertEquals(user.getSupervisorName(), result.getSupervisor().getValue());
    }

    @Test
    void changeUserGradeTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        addUser(user);

        UUID userId = getUserId(user);
        this.mockMvc.perform(post("/api/user/changeUserGrade")
                .param("userId", userId.toString())
                .param("grade", "Senior")
                .param("reason", "For testing purpose.")
        ).andExpect(status().isOk());

        UserDTO modifiedUser = getUserById(userId);
        assertEquals("Senior", modifiedUser.getGrade());
    }

    @Test
    void changeUserProjectTest() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        addUser(user);

        UUID userId = getUserId(user);
        String newProjectName = "new project";
        this.mockMvc.perform(post("/api/user/changeUserProject")
                .param("userId", userId.toString())
                .param("newProject", newProjectName)
                .param("newSupervisor", "")
                .param("newDepartment", "")
                .param("dateOfChange", LocalDate.now().toString())
        ).andExpect(status().isOk());

        UserDTO modifiedUser = getUserById(userId);
        assertEquals(newProjectName, modifiedUser.getProject());
    }

    @Test
    void getUsersByPartialNameTest() throws Exception {

        UserAdditionDTO user1 = generateSimpleUser();
        user1.setName("John Mason");
        addUser(user1);

        UserAdditionDTO user2 = generateSimpleUser();
        user2.setName("John Wick");
        addUser(user2);

        String partialName = "John";

        String usersListJson = this.mockMvc.perform(
                get("/api/user/getUsersByPartialName").param("partialName", partialName)
        ).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        List<UserDTO> usersList = objectMapper.readValue(usersListJson, new TypeReference<>() {
        });

        assertTrue(usersList.stream().anyMatch(u -> u.getName().equals(user1.getName())));
        assertTrue(usersList.stream().anyMatch(u -> u.getName().equals(user2.getName())));
    }

    private void getEndpointTest(String methodUrl, UserAdditionDTO user,
                                 MultiValueMap<String, String> params) throws Exception {

        UserDTO expected = getUserDTOFromUserAdditionDTO(user);
        addUser(user);

        String usersListJson = this.mockMvc.perform(
                get("/api/user/" + methodUrl).params(params)
        ).andReturn().getResponse().getContentAsString();

        List<UserDTO> usersList = objectMapper.readValue(usersListJson, new TypeReference<>() {});

        assertTrue(usersList.stream().anyMatch(u -> u.getName().equals(expected.getName())));
    }

    private UUID getUserIdByName(String userName) throws Exception {

        String usersListJson = this.mockMvc.perform(
                get("/api/user/getUsersByPartialName").param("partialName", userName)
        ).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        List<UserDTO> usersList = objectMapper.readValue(usersListJson, new TypeReference<>() {});

        Optional<UserDTO> possibleUser = usersList.stream()
                .filter(t -> t.getName().equals(userName)).findFirst();

        if (possibleUser.isEmpty()) fail();

        return possibleUser.get().getId();
    }

    private UUID getUserId(UserAdditionDTO user) throws Exception { return getUserIdByName(user.getName()); }

    private UserDTO getUserById(UUID userId) throws Exception {

        String userJson = this.mockMvc.perform(
                get("/api/user/" + userId.toString())
        ).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        return objectMapper.readValue(userJson, UserDTO.class);
    }

    private void addUser(UserAdditionDTO user) throws Exception {

        String json = objectMapper.writeValueAsString(user);
        this.mockMvc.perform(
                        post("/api/user/add")
                                .contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isCreated());
    }

    private String generateRandomString() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    private UserAdditionDTO generateSimpleUser() {

        Random random = new Random();
        String generatedName = generateRandomString();
        String generatedMail = generateRandomString();
        String generatedPhone = generateRandomString();

        String[] grades = new String[]{"Junior", "Middle", "Senior", "Team Lead"};
        int gradeId = random.nextInt(0, 4);

        String[] roles = new String[]{"Member", "Data Engineer", "Developer", "Team Lead",
                "Product Owner"};
        int roleId = random.nextInt(0, 5);

        return new UserAdditionDTO(
                generatedName,
                LocalDate.of(2000, 1, 1),
                generatedMail,
                generatedPhone,
                "",
                "",
                new ArrayList<>(),
                "Sample project",
                "Data Science",
                grades[gradeId],
                roles[roleId],
                ""
        );
    }

    private UserDTO getUserDTOFromUserAdditionDTO(UserAdditionDTO userAdditionDTO) {

        UserDTO expected = new UserDTO();
        expected.setName(userAdditionDTO.getName());
        expected.setEmail(userAdditionDTO.getEmail());
        expected.setProject(userAdditionDTO.getProject());
        expected.setDepartment(userAdditionDTO.getDepartment());
        return expected;
    }
}
