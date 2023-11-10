package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserDTO;
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
    public ResponseEntity<String> becomeMentee(@RequestBody UserDTO userDTO){
        try {
            changeMentorshipStatus(userDTO, MentorshipStatus.MENTEE);
        }
        catch (IllegalArgumentException exception) {
            return new ResponseEntity<>("This user is in mentorship pair already!", HttpStatusCode.valueOf(409));

        }
        return new ResponseEntity<>("The user has become mentee now", HttpStatusCode.valueOf(200));
    }

    @PostMapping("/becomeMentor")
    public ResponseEntity<String> becomeMentor(@RequestBody UserDTO userDTO) {
        try {
            changeMentorshipStatus(userDTO, MentorshipStatus.MENTOR);
        }
        catch (IllegalArgumentException exception) {
            return new ResponseEntity<>("This user is in mentorship pair already!", HttpStatusCode.valueOf(409));

        }
        return new ResponseEntity<>("The user has become mentor now", HttpStatusCode.valueOf(200));
    }

    private void changeMentorshipStatus(UserDTO userDTO, MentorshipStatus mentorStatus) {
        if (mentorshipRepository.countMentorshipByMenteeOrMentor(userDTO.getId()) > 0) {
            throw new IllegalArgumentException("IllegalArgumentException");
        }
        User user = userRepository.getUserById(userDTO.getId());
        user.setMentorStatus(mentorStatus);
        userRepository.save(user);
    }

}
