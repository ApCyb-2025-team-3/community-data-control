package edu.spbu.datacontrol.models;
import edu.spbu.datacontrol.models.enums.*;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class UserDTO {

  long id;

  String name;

  String email;

  String project;

  String department;

  @Enumerated(EnumType.STRING)
  Grade grade;

  @Enumerated(EnumType.STRING)
  Role role;
}
