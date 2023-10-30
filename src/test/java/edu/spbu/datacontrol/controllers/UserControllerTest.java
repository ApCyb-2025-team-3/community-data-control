package edu.spbu.datacontrol.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import edu.spbu.datacontrol.models.UserAdditionDTO;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import java.time.LocalDate;
import java.util.ArrayList;
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
    MockMvc mockMvc;

    @Test
    void addUserTest() throws Exception {

        ObjectMapper userAdditionDTOMapper = new ObjectMapper();
        userAdditionDTOMapper.registerModule(new JavaTimeModule());

        UserAdditionDTO userData = new UserAdditionDTO(
            "Michael White",
            LocalDate.of(2000, 1, 1),
            "simplemail@test.org",
            "999111999",
            "",
            "",
            new ArrayList<String>(),
            "Sample project",
            "Data Science",
            "Junior",
            "DataEngineer",
            ""
        );

        String json = userAdditionDTOMapper.writeValueAsString(userData);
        this.mockMvc.perform(
                post("/api/user/add").contentType(MediaType.APPLICATION_JSON).content(json))
            .andExpect(status().isOk());

    }

}
