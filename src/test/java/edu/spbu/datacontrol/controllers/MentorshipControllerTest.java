package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.repositories.EventRepository;
import edu.spbu.datacontrol.repositories.MentorshipRepository;
import edu.spbu.datacontrol.repositories.UserRepository;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

import static org.springframework.test.util.AssertionErrors.assertEquals;

@ExtendWith(MockitoExtension.class)
public class MentorshipControllerTest {

  UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
  MentorshipRepository mockMentorshipRepository = Mockito.mock(MentorshipRepository.class);
  EventRepository mockEventRepository = Mockito.mock(EventRepository.class);

  @Test
  public void becomeMenteeUserNotInMentorshipTest() throws Exception {
    User user = new User();
    UUID uuid = user.getId();
    user.setMentorStatus(MentorshipStatus.NOT_PARTICIPATING);
    Mockito.when(mockUserRepository.getUserById(uuid)).thenReturn(user);

    MentorshipController controller = new MentorshipController(mockUserRepository, mockMentorshipRepository, mockEventRepository);

    ResponseEntity<String> response = controller.becomeMentee(uuid);

    assertEquals("", "The user has become mentee now", response.getBody());
    assertEquals("", MentorshipStatus.MENTEE, user.getMentorStatus());
    assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
  }

  @Test
  public void becomeMenteeUserAlreadyInMentorshipPairTest() throws Exception {
    User mentee = new User();
    mentee.setMentorStatus(MentorshipStatus.MENTEE);
    UUID uuidMentee = mentee.getId();

    Mockito.when(mockMentorshipRepository.countMentorshipByMenteeOrMentor(uuidMentee)).thenReturn(1L);
    Mockito.when(mockUserRepository.getUserById(uuidMentee)).thenReturn(mentee);

    MentorshipController controller = new MentorshipController(mockUserRepository, mockMentorshipRepository, null);

    ResponseEntity<String> response = controller.becomeMentee(uuidMentee);

    assertEquals("", "This user is in mentorship pair already!", response.getBody());
    assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
  }

  @Test
  public void becomeMenteeAfterExitingMentorshipTest() throws Exception {
    User user = new User();
    UUID uuid = user.getId();
    Mockito.when(mockUserRepository.getUserById(uuid)).thenReturn(user);
    Mockito.when(mockUserRepository.save(user)).thenReturn(user);
    user.setMentorStatus(MentorshipStatus.MENTEE);

    MentorshipController controller = new MentorshipController(mockUserRepository, mockMentorshipRepository, mockEventRepository);

    controller.exitFromTheMentoringProgram(uuid);
    ResponseEntity<String> response = controller.becomeMentee(uuid);

    assertEquals("", "The user has become mentee now", response.getBody());
    assertEquals("", MentorshipStatus.MENTEE, user.getMentorStatus());
    assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
  }

  @Test
  public void becomeMenteeAfterBecomingMentorTest() throws Exception {
    User user = new User();
    UUID uuid = user.getId();
    user.setMentorStatus(MentorshipStatus.NOT_PARTICIPATING);
    Mockito.when(mockUserRepository.getUserById(uuid)).thenReturn(user);

    MentorshipController controller = new MentorshipController(mockUserRepository, mockMentorshipRepository, mockEventRepository);

    controller.becomeMentor(uuid);
    ResponseEntity<String> response = controller.becomeMentee(uuid);

    assertEquals("", "This user is a MENTOR already!", response.getBody());
    assertEquals("", MentorshipStatus.MENTOR, user.getMentorStatus());
    assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
  }

  @Test
  public void becomeMentorUserNotInMentorshipTest() throws Exception {
    User user = new User();
    UUID uuid = user.getId();
    user.setMentorStatus(MentorshipStatus.NOT_PARTICIPATING);
    Mockito.when(mockUserRepository.getUserById(uuid)).thenReturn(user);

    MentorshipController controller = new MentorshipController(mockUserRepository, mockMentorshipRepository, mockEventRepository);

    ResponseEntity<String> response = controller.becomeMentor(uuid);

    assertEquals("", "The user has become mentor now", response.getBody());
    assertEquals("", MentorshipStatus.MENTOR, user.getMentorStatus());
    assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
  }

  @Test
  public void becomeMentorUserAlreadyInMentorshipPairTest() throws Exception {
    User mentor = new User();
    mentor.setMentorStatus(MentorshipStatus.MENTOR);
    UUID uuidMentor = mentor.getId();

    Mockito.when(mockMentorshipRepository.countMentorshipByMenteeOrMentor(uuidMentor)).thenReturn(1L);
    Mockito.when(mockUserRepository.getUserById(uuidMentor)).thenReturn(mentor);

    MentorshipController controller = new MentorshipController(mockUserRepository, mockMentorshipRepository, null);

    ResponseEntity<String> response = controller.becomeMentee(uuidMentor);

    assertEquals("", "This user is in mentorship pair already!", response.getBody());
    assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
  }

  @Test
  public void becomeMentorAfterExitingMentorshipTest() throws Exception {
    User user = new User();
    UUID uuid = user.getId();
    Mockito.when(mockUserRepository.getUserById(uuid)).thenReturn(user);
    Mockito.when(mockUserRepository.save(user)).thenReturn(user);
    user.setMentorStatus(MentorshipStatus.MENTOR);

    MentorshipController controller = new MentorshipController(mockUserRepository, mockMentorshipRepository, mockEventRepository);

    controller.exitFromTheMentoringProgram(uuid);
    ResponseEntity<String> response = controller.becomeMentor(uuid);

    assertEquals("", "The user has become mentor now", response.getBody());
    assertEquals("", MentorshipStatus.MENTOR, user.getMentorStatus());
    assertEquals("", HttpStatusCode.valueOf(200), response.getStatusCode());
  }

  @Test
  public void becomeMentorAfterBecomingMenteeTest() throws Exception {
    User user = new User();
    UUID uuid = user.getId();
    user.setMentorStatus(MentorshipStatus.NOT_PARTICIPATING);
    Mockito.when(mockUserRepository.getUserById(uuid)).thenReturn(user);

    MentorshipController controller = new MentorshipController(mockUserRepository, mockMentorshipRepository, mockEventRepository);

    controller.becomeMentee(uuid);
    ResponseEntity<String> response = controller.becomeMentor(uuid);

    assertEquals("", "This user is a MENTEE already!", response.getBody());
    assertEquals("", MentorshipStatus.MENTEE, user.getMentorStatus());
    assertEquals("", HttpStatusCode.valueOf(409), response.getStatusCode());
  }

}
