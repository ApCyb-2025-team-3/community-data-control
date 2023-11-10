package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Mentorship;
import edu.spbu.datacontrol.models.User;

import java.util.Date;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorshipRepository extends CrudRepository<Mentorship, UUID> {
    Mentorship getMentorshipById(UUID id);

    Mentorship getMentorshipByMentor(User mentor);

    Mentorship getMentorshipByMentee(User mentee);

    List<Mentorship> getMentorshipsByCreationDate(Date creationDate);

    List<Mentorship> getMentorshipsByDisbandmentDate(Date disbandmentDate);
}