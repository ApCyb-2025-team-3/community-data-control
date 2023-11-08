package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Mentorship;
import edu.spbu.datacontrol.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MentorshipRepository extends CrudRepository<Mentorship, UUID> {

    int getNumberOfUserPairs(User user);

}