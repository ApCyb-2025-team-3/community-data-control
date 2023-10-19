package edu.spbu.datacontrol.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Data
@Table(name="users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  long id;

  @CreatedDate
  Date invitedAt;

  boolean isActive;

  String name;

  Date dob;

  String email;

  String phoneNumber;

  // TODO: Maybe change to ID if supervisor is in system
  String supervisorName;

  long teamleadId;

  long[] productOwnersIds;

  // TODO: Maybe change to group ID
  String project;

  String department;

  // TODO: Change to enum
  String grade;

  // TODO: Change to enum
  String role;

  // TODO: Change to enum
  String mentorStatus;
}
