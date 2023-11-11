package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Mentorship;
import edu.spbu.datacontrol.models.MentorshipCreationDTO;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.MentorshipRepository;
import edu.spbu.datacontrol.repositories.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mentorship")
public class MentorshipController {

    private final MentorshipRepository mentorshipRepository;
    private final UserRepository userRepository;

    public MentorshipController(MentorshipRepository mentorshipRepository, UserRepository userRepository) {
        this.mentorshipRepository = mentorshipRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createMentorship(@RequestBody MentorshipCreationDTO mentorshipData) {

        User mentor = userRepository.getUserById(mentorshipData.getMentorDTO().getId());
        User mentee = userRepository.getUserById(mentorshipData.getMenteeDTO().getId());

        if (mentor.hasRole(MentorshipStatus.MENTOR) && mentee.hasRole(MentorshipStatus.MENTEE)) {
            mentorshipRepository.save(new Mentorship(mentor, mentee, mentorshipData.getDisbadmentDate()));
            return new ResponseEntity<>("Mentorship is added.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("The mentor or mentee is incorrectly specified.", HttpStatusCode.valueOf(409));
        }

    }
}