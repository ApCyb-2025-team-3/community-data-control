package edu.spbu.datacontrol.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.enums.GroupType;
import edu.spbu.datacontrol.repositories.GroupRepository;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Random;
import java.util.UUID;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureEmbeddedDatabase
class GroupControllerTest {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private GroupRepository repository;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void createGroupTest() throws Exception {

        ObjectMapper groupMapper = new ObjectMapper();
        groupMapper.registerModule(new JavaTimeModule());

        Group testGroup = createTestGroup();
        String json = groupMapper.writeValueAsString(testGroup);
        this.mockMvc.perform(
                        post("/api/group/create").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());//если, я правильно все понял, то эта строчка лишняя
        //надеюсь идейно должно быть что-то такое, только с параметрами потом стоит разобраться
        String response = this.mockMvc.perform(
                post("/api/group/create")
                        .param("name", testGroup.getName())
                        .param("type", String.valueOf(testGroup.getType()))
                        .param("description", testGroup.getDescription())
                        .param("teamLead", String.valueOf(testGroup.getTeamLead())))
                    .andExpect(status().isOk())
                    .andReturn()
                    .getResponse()
                    .getContentAsString();
        Assertions.assertEquals("Group successfully created.", response);

    }

    private Group createTestGroup() {

        Random random = new Random();
        String generatedName = generateRandomString();
        String[] types = new String[]{"Work team", "Interest group"};
        int typeId = random.nextInt(0, 2);
        return new Group(generatedName, GroupType.valueOf(types[typeId]), "");
    }

    private String generateRandomString() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
