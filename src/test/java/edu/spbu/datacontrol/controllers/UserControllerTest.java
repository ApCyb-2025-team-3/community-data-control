package edu.spbu.datacontrol.controllers;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import edu.spbu.datacontrol.models.UserAdditionDTO;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.models.UserDataChangeDTO;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import org.testcontainers.shaded.com.github.dockerjava.core.dockerfile.DockerfileStatement.Add;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureEmbeddedDatabase
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

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
                post("/api/user/dismissUserById")
                    .param("userId", id.toString())
                    .param("description", description))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsString();
        assertEquals("User was successfully dismissed", response);
    }

    @Test
    void getDismissedUserByRoleAndGrade() throws Exception {

        UserAdditionDTO user = generateSimpleUser();
        addUser(user);

        String usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersByRole").param("role", user.getRole())
        ).andReturn().getResponse().getContentAsString();

        // TODO: change to getting Id by user name when implemented
        List<UserDTO> result = objectMapper.readValue(usersListJson, new TypeReference<>(){});
        Optional<UserDTO> possibleUser = result.stream().filter(t -> t.getName().equals(user.getName()))
            .findFirst();

        if (possibleUser.isEmpty()) fail();
        UUID userId = possibleUser.get().getId();

        this.mockMvc.perform(post("/api/user/dismissUserById")
            .param("userId", userId.toString())
            .param("description", "For testing purpose.")
        ).andExpect(status().isOk());

        usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersByRole").param("role", user.getRole())
        ).andReturn().getResponse().getContentAsString();
        result = objectMapper.readValue(usersListJson, new TypeReference<>(){});
        assertTrue(result.stream().noneMatch(t -> t.getId().equals(userId)));

        usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersByGrade").param("grade", user.getGrade())
        ).andReturn().getResponse().getContentAsString();
        result = objectMapper.readValue(usersListJson, new TypeReference<>(){});
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

        // TODO: change to getting Id by users name when implemented
        String usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersByRole").param("role", "supervisor")
        ).andReturn().getResponse().getContentAsString();
        List<UserDTO> usersList = objectMapper.readValue(usersListJson, new TypeReference<>() {
        });
        UUID id = usersList.get(0).getId();

        usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersBySupervisorID").param("supervisorId", id.toString())
        ).andReturn().getResponse().getContentAsString();

        usersList = objectMapper.readValue(usersListJson, new TypeReference<>() {
        });
        assertTrue(usersList.stream().anyMatch(u -> u.getName().equals(expected.getName())));
        assertTrue(usersList.stream().anyMatch(u -> u.getEmail().equals(expected.getEmail())));
        assertTrue(
            usersList.stream().anyMatch(u -> u.getDepartment().equals(expected.getDepartment())));
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

    private UUID getUserId(UserAdditionDTO user) throws Exception {

        String usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersByRole").param("role", user.getRole())
        ).andReturn().getResponse().getContentAsString();
        List<UserDTO> usersList = objectMapper.readValue(usersListJson, new TypeReference<>() {
        });
        return usersList.get(0).getId();
    }

    private UserDTO getUserById(UUID userId) throws Exception {

        String userJson = this.mockMvc.perform(
            get("/api/user/getUserById").param("userId", userId.toString())
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
