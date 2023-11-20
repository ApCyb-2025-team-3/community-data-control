package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.Grade;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.models.enums.Role;
import edu.spbu.datacontrol.models.Group;

import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {

    User getUserById(UUID userId);

    User getUserByEmail(String email);

    User getUserByPhoneNumber(String phoneNumber);

    List<User> getUsersByName(String name);

    List<User> getUsersByNameAndRole(String name, Role role);

    List<User> getUsersByNameInAndRole(List<String> names, Role role);

    List<User> getUsersByRoleAndIsActiveTrue(Role role);

    List<User> getUsersBySupervisor(User supervisor);

    List<User> findAllByOrderByName();

    List<User> getUsersByGradeAndIsActiveTrue(Grade grade);

    List<User> getUsersByMentorStatusAndIsActiveTrue(MentorshipStatus mentorStatus);

    List<User> getUsersByGroupsContainsAndIsActiveTrue(Group group);

    List<User> getUsersByIsActiveFalse();

    List<User> getUsersByDepartmentAndIsActiveTrue(String department);

    List<User> getUsersByProjectAndIsActiveTrue(String project);

    List<User> findByNameContaining(String partialName);

    @Query("SELECT u FROM User u WHERE u.mentorStatus =:mentorStatus  " +
            "AND NOT EXISTS (SELECT m FROM Mentorship m WHERE m.mentor.id = u.id OR m.mentee.id = u.id)")
    List<User> getFreeUsersByMentorStatus(@Param("mentorStatus") MentorshipStatus mentorStatus);
}
