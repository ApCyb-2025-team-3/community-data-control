package edu.spbu.datacontrol.models;

import lombok.Data;

@Data
public class UserDTO {

  long id;

  String name;

  String email;

  String project;

  String department;

  // TODO: Change to enum
  String grade;

  // TODO: Change to enum
  String role;
}
