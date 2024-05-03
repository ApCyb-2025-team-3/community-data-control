package edu.spbu.datacontrol.userservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import edu.spbu.datacontrol.User;
import edu.spbu.datacontrol.enums.Role;
import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureEmbeddedDatabase
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void saveAndGetByIdTest() {
        User user = new User();
        user.setName("John Doe");
        user = userRepository.save(user);
        UUID userId = user.getId();
        User savedUser = userRepository.getUserById(userId);
        assertEquals(user.getId(), savedUser.getId());
        System.out.println(user.getId());
        assertEquals(user.getName(), savedUser.getName());
        System.out.println(user.getName());
        assertEquals(user.getInvitedAt(), savedUser.getInvitedAt());
        System.out.println(user.getInvitedAt());
    }

    @Test
    void getUsersByNameAndRoleTest() {
        User userA = new User();
        userA.setName("John Smith");
        userA.setRole(Role.TEAM_LEAD);
        User userB = new User();
        userB.setName("John Smith");
        userB.setRole(Role.MEMBER);

        UUID teamLeadId = userRepository.save(userA).getId();
        userRepository.save(userB);

        List<User> teamLeadsWithNameJohn = userRepository.getUsersByNameAndRole("John Smith",
            Role.TEAM_LEAD);
        assertEquals(1, teamLeadsWithNameJohn.size());
        assertEquals(teamLeadId, teamLeadsWithNameJohn.get(0).getId());
    }

    @Test
    void getUsersByNameInAndRoleTest() {
        User userA = new User();
        userA.setName("John Black");
        userA.setRole(Role.TEAM_LEAD);
        User userB = new User();
        userB.setName("John Black");
        userB.setRole(Role.MEMBER);
        User userC = new User();
        userC.setName("Mike Smith");
        userC.setRole(Role.TEAM_LEAD);
        User userD = new User();
        userD.setName("William Black");
        userD.setRole(Role.TEAM_LEAD);

        List<UUID> expectedUUID = new ArrayList<>();

        expectedUUID.add(userRepository.save(userA).getId());
        userRepository.save(userB);
        expectedUUID.add(userRepository.save(userC).getId());
        userRepository.save(userC);
        userRepository.save(userD);

        List<String> names = new ArrayList<>(List.of("John Black", "Mike Smith"));

        List<User> teamLeads = userRepository.getUsersByNameInAndRole(names, Role.TEAM_LEAD);
        assertEquals(2, teamLeads.size());
        teamLeads.forEach(u -> assertTrue(expectedUUID.contains(u.getId())));
    }

    @Test
    void getUsersByRoleTest() {
        User userA = new User();
        userA.setName("James Doe");
        userA.setRole(Role.DEVELOPER);
        User userB = new User();
        userB.setName("William White");
        userB.setRole(Role.DEVELOPER);
        User userC = new User();
        userC.setName("James Doe");
        userC.setRole(Role.DATA_ENGINEER);

        List<UUID> expectedDevs = new ArrayList<>();

        expectedDevs.add(userRepository.save(userA).getId());
        expectedDevs.add(userRepository.save(userB).getId());
        userRepository.save(userC);

        List<User> developers = userRepository.getUsersByRoleAndIsActiveTrue(Role.DEVELOPER);
        assertEquals(2, developers.size());
        developers.forEach(u -> assertTrue(expectedDevs.contains(u.getId())));
    }

    @Test
    void getUsersBySupervisorTest() {
        User userA = new User();
        userA.setName("James Doe123213213");
        userA.setRole(Role.SUPERVISOR);
        User userB = new User();
        userB.setName("William White153214");
        userB.setRole(Role.DEVELOPER);
        userB.setSupervisor(userA);
        User userC = new User();
        userC.setName("James Doe5143234");
        userC.setRole(Role.DATA_ENGINEER);

        List<User> expectedUsers = new ArrayList<>();

        userRepository.save(userA);
        expectedUsers.add(userRepository.save(userB));
        userRepository.save(userC);

        List<User> subordinates = userRepository.getUsersBySupervisor(userA);
        assertEquals(expectedUsers.size(), subordinates.size());
        subordinates.forEach(u -> assertEquals(userA.getId(), u.getSupervisor().getId()));
    }

}
