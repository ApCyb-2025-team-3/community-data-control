package edu.spbu.datacontrol.groupservice.repositories;


import edu.spbu.datacontrol.commons.User;
import edu.spbu.datacontrol.groupservice.models.Mentorship;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MentorshipRepository extends CrudRepository<Mentorship, UUID> {

    @Query("SELECT COUNT(m) FROM Mentorship m WHERE m.mentor.id = :uId OR m.mentee.id = :uId")
    long countMentorshipByMenteeOrMentor(@Param("uId") UUID uId);

    Mentorship getMentorshipById(UUID mentorshipId);

    @Query("SELECT u from User u RIGHT JOIN Mentorship m ON u.id = m.mentee.id WHERE m.mentor.id = :mentorId")
    List<User> getMenteesByMentorId(@Param("mentorId") UUID mentorId);

    @Query("SELECT u from User u RIGHT JOIN Mentorship m ON u.id = m.mentor.id WHERE m.mentee.id = :menteeId")
    User getMentorByMenteeId(@Param("menteeId") UUID menteeId);

    @Query("SELECT m FROM Mentorship m WHERE m.mentee.id = :userId OR m.mentor.id = :userId")
    List<Mentorship> getMentorshipsByUserId(@Param("userId") UUID userId);

}
