package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.UserDTO;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.MentorshipRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import edu.spbu.datacontrol.models.Mentorship;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
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

    @PatchMapping("/becomeMentee")
    public ResponseEntity<String> becomeMentee(@RequestBody UserDTO userDTO) {
        try {
            changeMentorshipStatus(userDTO.getId(), MentorshipStatus.MENTEE);
            User user = userRepository.getUserById(userDTO.getId());
            userRepository.save(user);
        } catch (IllegalArgumentException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatusCode.valueOf(409));

        }
        return new ResponseEntity<>("The user has become mentee now", HttpStatusCode.valueOf(200));
    }

    @PatchMapping("/becomeMentor")
    public ResponseEntity<String> becomeMentor(@RequestBody UserDTO userDTO) {
        try {
            changeMentorshipStatus(userDTO.getId(), MentorshipStatus.MENTOR);
            User user = userRepository.getUserById(userDTO.getId());
            userRepository.save(user);
        } catch (IllegalArgumentException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatusCode.valueOf(409));

        }
        return new ResponseEntity<>("The user has become mentor now", HttpStatusCode.valueOf(200));
    }

    @PostMapping("/create")
    public ResponseEntity<String> createMentorship(@RequestParam UUID mentorId, @RequestParam UUID menteeId, @RequestParam Date disbandmentDate) {

        User mentor = userRepository.getUserById(mentorId);
        User mentee = userRepository.getUserById(menteeId);

        if (mentor == null || mentee == null) {
            return new ResponseEntity<>("No mentor or mentee with this id found.", HttpStatusCode.valueOf(404));
        }

        if (!mentor.hasMentorshipStatus(MentorshipStatus.MENTOR) || !mentee.hasMentorshipStatus(MentorshipStatus.MENTEE)) {
            return new ResponseEntity<>("The mentor or mentee is incorrectly specified.", HttpStatusCode.valueOf(409));
        }
        mentorshipRepository.save(new Mentorship(mentor, mentee, disbandmentDate));
        return new ResponseEntity<>("Mentorship is created.", HttpStatusCode.valueOf(201));

    }

    @GetMapping("/getAllMentors")
    public ResponseEntity<List<UserDTO>> getAllMentors(){
        try {
            return new ResponseEntity<>(
                    userRepository.getUsersByMentorStatusAndIsActiveTrue(MentorshipStatus.MENTOR)
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatusCode.valueOf(200));
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getAllMentees")
    public ResponseEntity<List<UserDTO>> getAllMentees(){
        try {
            return new ResponseEntity<>(
                    userRepository.getUsersByMentorStatusAndIsActiveTrue(MentorshipStatus.MENTEE)
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatusCode.valueOf(200));
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getFreeMentors")
    public ResponseEntity<List<UserDTO>> getFreeMentors(){
        try {
            return new ResponseEntity<>(
                userRepository.getFreeUsersByMentorStatus(MentorshipStatus.MENTOR)
                    .stream()
                    .map(UserDTO::new)
                    .toList(), HttpStatusCode.valueOf(200));
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getFreeMentees")
    public ResponseEntity<List<UserDTO>> getFreeMentees(){
        try {
            return new ResponseEntity<>(
                userRepository.getFreeUsersByMentorStatus(MentorshipStatus.MENTEE)
                    .stream()
                    .map(UserDTO::new)
                    .toList(), HttpStatusCode.valueOf(200));
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    private void changeMentorshipStatus(UUID userId, MentorshipStatus mentorStatus) throws IllegalArgumentException {
        if (isInMentorship(userId)) {
            throw new IllegalArgumentException("This user is in mentorship pair already!");
        }
        User user = userRepository.getUserById(userId);
        user.setMentorStatus(mentorStatus);
    }

    private boolean isInMentorship(UUID userId) {
        return mentorshipRepository.countMentorshipByMenteeOrMentor(userId) > 0;
    }

}
