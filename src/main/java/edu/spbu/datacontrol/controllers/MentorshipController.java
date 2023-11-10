package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Mentorship;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.MentorshipRepository;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mentorships")
public class MentorshipController {

    private final MentorshipRepository mentorshipRepository;

    public MentorshipController(MentorshipRepository mentorshipRepository) {
        this.mentorshipRepository = mentorshipRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMentorship(@RequestBody User mentor, @RequestBody User mentee, @RequestBody Date disbandmentDate) {
        if (mentor.getMentorStatus() == MentorshipStatus.MENTOR && mentee.getMentorStatus() == MentorshipStatus.MENTEE) {
            mentorshipRepository.save(new Mentorship(mentor, mentee, disbandmentDate));
            return new ResponseEntity<>("Mentorship is added.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("The mentor or mentee is incorrectly specified.", HttpStatusCode.valueOf(409));
        }

    }
}