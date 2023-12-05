package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Mentorship;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MentorshipRepository extends CrudRepository<Mentorship, UUID> {

    @Query("SELECT COUNT(m) FROM Mentorship m WHERE m.mentor.id = :uId OR m.mentee.id = :uId")
    long countMentorshipByMenteeOrMentor(@Param("uId") UUID uId);

}