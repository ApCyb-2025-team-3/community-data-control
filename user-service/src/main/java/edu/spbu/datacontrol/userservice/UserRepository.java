package edu.spbu.datacontrol.userservice;


import edu.spbu.datacontrol.commons.User;
import edu.spbu.datacontrol.commons.enums.Grade;
import edu.spbu.datacontrol.commons.enums.MentorshipStatus;
import edu.spbu.datacontrol.commons.enums.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {

    User getUserById(UUID userId);

    User getUserByEmail(String email);

    User getUserByPhoneNumber(String phoneNumber);

    List<User> getUsersByName(String name);

    User getUserByName(String name);

    List<User> getUsersByNameAndRole(String name, Role role);

    List<User> getUsersByNameInAndRole(List<String> names, Role role);

    List<User> getUsersByRoleAndIsActiveTrue(Role role);

    List<User> getUsersBySupervisor(User supervisor);

    List<User> getUsersByProductOwnersContaining(User productOwner);

    List<User> findAllByOrderByName();

    List<User> getUsersByGradeAndIsActiveTrue(Grade grade);

    List<User> getUsersByMentorStatusAndIsActiveTrue(MentorshipStatus mentorStatus);

    List<User> getUsersByIsActiveFalse();

    List<User> getUsersByDepartmentContainingIgnoreCaseAndIsActiveTrue(String department);

    List<User> getUsersByProjectContainingIgnoreCaseAndIsActiveTrue(String project);

    List<User> findByNameContainingIgnoreCaseAndIsActiveTrue(String partialName);

    @Query("SELECT u FROM User u WHERE u.mentorStatus = 'MENTOR' " +
            "AND NOT EXISTS (SELECT m FROM Mentorship m WHERE m.mentor.id = u.id)")
    List<User> getFreeMentors();

    @Query("SELECT u FROM User u WHERE u.mentorStatus = 'MENTEE' " +
            "AND NOT EXISTS (SELECT m FROM Mentorship m WHERE m.mentee.id = u.id)")
    List<User> getFreeMentees();

}
