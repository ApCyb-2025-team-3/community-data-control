package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
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
    private UserRepository userRepository;
    public MentorshipController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/becomeMentee")
    public ResponseEntity<User> becomeMentee(@RequestBody User user){
        if (isInMentorship(user)) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }
        user.setMentorStatus(MentorshipStatus.MENTEE);
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/becomeMentor")
    public ResponseEntity<User> becomeMentor(@RequestBody User user) {
        if (isInMentorship(user)) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(409));
        }
        user.setMentorStatus(MentorshipStatus.MENTOR);
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatusCode.valueOf(200));
    }

    private boolean isInMentorship(User user) {
        return false;   //
    }

}
