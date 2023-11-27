package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.*;
import edu.spbu.datacontrol.models.enums.EventType;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.EventRepository;
import edu.spbu.datacontrol.repositories.MentorshipRepository;
import edu.spbu.datacontrol.repositories.UserRepository;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/mentorship")
public class MentorshipController {
    private final UserRepository userRepository;
    private final MentorshipRepository mentorshipRepository;
    private final EventRepository eventLog;

    public MentorshipController(UserRepository userRepository, MentorshipRepository mentorshipRepository,
                                EventRepository eventLog) {
        this.userRepository = userRepository;
        this.mentorshipRepository = mentorshipRepository;
        this.eventLog = eventLog;
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

    @PatchMapping("/exitFromTheMentoringProgram")
    public ResponseEntity<String> exitFromTheMentoringProgram(@RequestBody UserDTO userDTO) {
        User user = userRepository.getUserById(userDTO.getId());

        if (user == null) {
            return new ResponseEntity<>("User hasn't been found", HttpStatusCode.valueOf(404));
        }

        if (user.getMentorStatus() == MentorshipStatus.NOT_PARTICIPATING){
            return new ResponseEntity<>("The user is not already in the mentoring program",
                    HttpStatusCode.valueOf(400));
        }

        List<Mentorship> mentorships = mentorshipRepository.getMentorshipsByUserId(user.getId());
        mentorshipRepository.deleteAll(mentorships);

        user.setMentorStatus(MentorshipStatus.NOT_PARTICIPATING);
        user = userRepository.save(user);

        Event exitFromTheMentoringProgram = new Event(user.getId(), EventType.EXIT_FROM_THE_MENTORING_PROGRAM, "");
        eventLog.save(exitFromTheMentoringProgram);

        return new ResponseEntity<>("The user has successfully left the mentoring program",
                HttpStatusCode.valueOf(200));

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

    @DeleteMapping("/disbandMentorship")
    public ResponseEntity<String> disbandMentorship(@RequestParam UUID mentorshipId) {
        Mentorship mentorship = mentorshipRepository.getMentorshipById(mentorshipId);
        if (mentorship != null) {
            mentorshipRepository.delete(mentorship);
            return new ResponseEntity<>("Mentorship was successfully disbanded",
                    HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>("This mentorship doesn't exist",
                HttpStatusCode.valueOf(404));
    }

    @GetMapping("/getAllMentorships")
    public ResponseEntity<List<MentorshipDTO>> getAllMentorships() {
        try {
            List<Mentorship> mentorships = StreamSupport.stream(mentorshipRepository
                    .findAll().
                    spliterator(), false)
                    .toList();
            return new ResponseEntity<>(mentorships
                    .stream()
                    .map(MentorshipDTO::new)
                    .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getAllMentors")
    public ResponseEntity<List<UserDTO>> getAllMentors() {
        try {
            return new ResponseEntity<>(
                    userRepository.getUsersByMentorStatusAndIsActiveTrue(MentorshipStatus.MENTOR)
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getAllMentees")
    public ResponseEntity<List<UserDTO>> getAllMentees() {
        try {
            return new ResponseEntity<>(
                    userRepository.getUsersByMentorStatusAndIsActiveTrue(MentorshipStatus.MENTEE)
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getFreeMentors")
    public ResponseEntity<List<UserDTO>> getFreeMentors() {
        try {
            return new ResponseEntity<>(
                    userRepository.getFreeMentors()
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getFreeMentees")
    public ResponseEntity<List<UserDTO>> getFreeMentees() {
        try {
            return new ResponseEntity<>(
                    userRepository.getFreeMentees()
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getMenteesByMentor")
    public ResponseEntity<List<UserDTO>> getMenteesByMentor(@RequestParam UUID mentorId) {
        try {
            return new ResponseEntity<>(
                    mentorshipRepository.getMenteesByMentorId(mentorId)
                            .stream()
                            .map(UserDTO::new)
                            .toList(), HttpStatusCode.valueOf(200));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        }
    }

    @GetMapping("/getMentorByMentee")
    public ResponseEntity<UserDTO> getMentorByMentee(@RequestParam UUID menteeId) {
        User mentor = mentorshipRepository.getMentorByMenteeId(menteeId);
        if(mentor != null){
            return new ResponseEntity<>(new UserDTO(mentor), HttpStatusCode.valueOf(200));
        }

        return new ResponseEntity<>(HttpStatusCode.valueOf(404));
    }

    private void changeMentorshipStatus(UUID userId, MentorshipStatus mentorStatus) throws IllegalArgumentException {
        if (isInMentorship(userId)) {
            throw new IllegalArgumentException("This user is in mentorship pair already!");
        }
        User user = userRepository.getUserById(userId);
        if (user.getMentorStatus() == MentorshipStatus.NOT_PARTICIPATING) {
            eventLog.save( new Event(userId, EventType.JOINING_THE_MENTORING_PROGRAM,""));
        }
        user.setMentorStatus(mentorStatus);
    }

    private boolean isInMentorship(UUID userId) {
        return mentorshipRepository.countMentorshipByMenteeOrMentor(userId) > 0;
    }

}
