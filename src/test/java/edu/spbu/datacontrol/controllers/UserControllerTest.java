package edu.spbu.datacontrol.controllers;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import edu.spbu.datacontrol.models.UserAdditionDTO;
import edu.spbu.datacontrol.models.UserDTO;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

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
    void getUsersByRoleTest() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        UserAdditionDTO user = generateSimpleUser();
        UserDTO expected = new UserDTO();
        expected.setName(user.getName());
        expected.setEmail(user.getEmail());
        expected.setProject(user.getProject());
        expected.setDepartment(user.getDepartment());
        String json = objectMapper.writeValueAsString(user);
        this.mockMvc.perform(
                post("/api/user/add").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());

        String usersListJson = this.mockMvc.perform(
            get("/api/user/getUsersByRole").param("role", user.getRole())
        ).andReturn().getResponse().getContentAsString();

        List<UserDTO> usersList = objectMapper.readValue(usersListJson,
            new TypeReference<List<UserDTO>>() {}
            );

        assertTrue(usersList.stream().anyMatch(u -> u.getName().equals(expected.getName())));
    }

    private String generateRandomString() {
        return UUID.randomUUID().toString().replace("-" , "");
    }

    private UserAdditionDTO generateSimpleUser() {

        Random random = new Random();
        String generatedName = generateRandomString();
        String generatedMail = generateRandomString();
        String generatedPhone = generateRandomString();

        String[] grades = new String[] {"Junior", "Middle", "Senior", "Team Lead"};
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
            new ArrayList<String>(),
            "Sample project",
            "Data Science",
            grades[gradeId],
            roles[roleId],
            ""
        );
    }

}
