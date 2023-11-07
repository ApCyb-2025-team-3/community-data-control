package edu.spbu.datacontrol.controllers;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import edu.spbu.datacontrol.models.UserAdditionDTO;
import edu.spbu.datacontrol.models.UserDTO;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
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

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureEmbeddedDatabase
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void addUserTest() throws Exception {

        ObjectMapper userAdditionDTOMapper = new ObjectMapper();
        userAdditionDTOMapper.registerModule(new JavaTimeModule());

        UserAdditionDTO userData = generateSimpleUser();

        String json = userAdditionDTOMapper.writeValueAsString(userData);
        this.mockMvc.perform(
                        post("/api/user/add").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());

    }

    @Test
    void dismissUserTest() throws Exception {


        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        UserAdditionDTO user = generateSimpleUser();
        String json = objectMapper.writeValueAsString(user);
        this.mockMvc.perform(
                post("/api/user/add")
                    .contentType(MediaType.APPLICATION_JSON).content(json))
                    .andExpect(status().isOk());

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
                    .param("uuid", id.toString())
                    .param("description", description))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsString();
        Assertions.assertEquals("User was successfully dismissed", response);
    }

    @Test
    void getUsersBySupervisorIdTest() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        UserAdditionDTO supervisor = generateSimpleUser();
        supervisor.setRole("supervisor");
        UserAdditionDTO subordinate = generateSimpleUser();
        subordinate.setSupervisorName(supervisor.getName());

        UserDTO expected = new UserDTO();
        expected.setProject(subordinate.getProject());
        expected.setName(subordinate.getName());
        expected.setEmail(subordinate.getEmail());
        expected.setDepartment(subordinate.getDepartment());


        String json = objectMapper.writeValueAsString(supervisor);
        this.mockMvc.perform(
                post("/api/user/add").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());
        json = objectMapper.writeValueAsString(subordinate);
        this.mockMvc.perform(
                post("/api/user/add").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());
        String usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersByRole").param("role", "supervisor")
        ).andReturn().getResponse().getContentAsString();

        List<UserDTO> usersList = objectMapper.readValue(usersListJson,
            new TypeReference<>() {}
        );
        UUID id = usersList.get(0).getId();
        usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersBySupervisorID").param("supervisorId", id.toString())
        ).andReturn().getResponse().getContentAsString();
        usersList = objectMapper.readValue(usersListJson,
            new TypeReference<>() {}
        );
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


    private void getEndpointTest(String methodUrl, UserAdditionDTO user, MultiValueMap<String, String> params) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        UserDTO expected = getUserDTOFromUserAdditionDTO(user);
        String json = objectMapper.writeValueAsString(user);
        this.mockMvc.perform(
                        post("/api/user/add").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());

        String usersListJson = this.mockMvc.perform(
                get("/api/user/" + methodUrl).params(params)
        ).andReturn().getResponse().getContentAsString();

        List<UserDTO> usersList = objectMapper.readValue(usersListJson,
                new TypeReference<>() {
                }
        );

        assertTrue(usersList.stream().anyMatch(u -> u.getName().equals(expected.getName())));
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
