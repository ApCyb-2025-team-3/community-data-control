package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.MentorshipRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import edu.spbu.datacontrol.models.Mentorship;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/mentorship")
public class MentorshipController {
    private final UserRepository userRepository;
    private final MentorshipRepository mentorshipRepository;

    public MentorshipController(UserRepository userRepository, MentorshipRepository mentorshipRepository) {
        this.userRepository = userRepository;
        this.mentorshipRepository = mentorshipRepository;
    }

    @PostMapping("/becomeMentee")
    public ResponseEntity<String> becomeMentee(@RequestBody UserDTO userDTO) {
        try {
            changeMentorshipStatus(userDTO.getId(), MentorshipStatus.MENTEE);
        } catch (IllegalArgumentException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatusCode.valueOf(409));

        }
        return new ResponseEntity<>("The user has become mentee now", HttpStatusCode.valueOf(200));
    }

    @PostMapping("/becomeMentor")
    public ResponseEntity<String> becomeMentor(@RequestBody UserDTO userDTO) {
        try {
            changeMentorshipStatus(userDTO.getId(), MentorshipStatus.MENTOR);
        } catch (IllegalArgumentException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatusCode.valueOf(409));

        }
        return new ResponseEntity<>("The user has become mentor now", HttpStatusCode.valueOf(200));
    }

    @PostMapping("/create")
    public ResponseEntity<String> createMentorship(@RequestBody UUID mentorId, @RequestBody UUID menteeId, @RequestBody Date disbadmentData) {

        User mentor = userRepository.getUserById(mentorId);
        User mentee = userRepository.getUserById(menteeId);

        if (!mentor.hasRole(MentorshipStatus.MENTOR) || !mentee.hasRole(MentorshipStatus.MENTEE)) {
            return new ResponseEntity<>("The mentor or mentee is incorrectly specified.", HttpStatusCode.valueOf(409));
        }
        mentorshipRepository.save(new Mentorship(mentor, mentee, disbadmentData));
        return new ResponseEntity<>("Mentorship is added.", HttpStatusCode.valueOf(201));

    }

    private void changeMentorshipStatus(UUID userId, MentorshipStatus mentorStatus) throws IllegalArgumentException {
        if (isInMentorship(userId)) {
            throw new IllegalArgumentException("This user is in mentorship pair already!");
        }
        User user = userRepository.getUserById(userId);
        user.setMentorStatus(mentorStatus);
        userRepository.save(user);
    }

    private boolean isInMentorship(UUID userId) {
        return mentorshipRepository.countMentorshipByMenteeOrMentor(userId) > 0;
    }

}