package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.MentorshipRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<User> becomeMentee(@RequestBody User user){
        return ChangeMentorshipStatus(user, MentorshipStatus.MENTEE);
    }

    @PostMapping("/becomeMentor")
    public ResponseEntity<User> becomeMentor(@RequestBody User user) {
        return ChangeMentorshipStatus(user, MentorshipStatus.MENTOR);
    }

    private ResponseEntity<User> ChangeMentorshipStatus(User user, MentorshipStatus mentorStatus) {
        if (mentorshipRepository.countMentorshipByMenteeOrMentor(user.getId()) > 0) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }
        user.setMentorStatus(mentorStatus);
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatusCode.valueOf(200));
    }

}
