package edu.spbu.datacontrol.groupservice.repositories;


import edu.spbu.datacontrol.commons.User;
import edu.spbu.datacontrol.commons.enums.MentorshipStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {

    User getUserById(UUID userId);

    List<User> getUsersByMentorStatusAndIsActiveTrue(MentorshipStatus mentorStatus);

    @Query("SELECT u FROM User u WHERE u.mentorStatus = 'MENTOR' " +
            "AND NOT EXISTS (SELECT m FROM Mentorship m WHERE m.mentor.id = u.id)")
    List<User> getFreeMentors();

    @Query("SELECT u FROM User u WHERE u.mentorStatus = 'MENTEE' " +
            "AND NOT EXISTS (SELECT m FROM Mentorship m WHERE m.mentee.id = u.id)")
    List<User> getFreeMentees();

}
