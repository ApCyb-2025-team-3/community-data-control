package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/api/user")
public class MentorshipController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/becomeMentee")
    public ResponseEntity<?> becomeMentee(@RequestBody User user){
        try {
            User tryUser = userRepository.getUserById(user.getId()).orElseThrow();
            return new ResponseEntity<>(tryUser, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setMentorshipStatus(MentorshipStatus.MENTEE);
    }



    @PostMapping("/becomeMentor")
    public ResponseEntity<?> becomeMentor(@RequestBody User user) {
        try {
            User tryUser = userRepository.getUserById(user.getId()).orElseThrow();
            return new ResponseEntity<>(tryUser, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setMentorshipStatus(MentorshipStatus.MENTOR);
    }

}