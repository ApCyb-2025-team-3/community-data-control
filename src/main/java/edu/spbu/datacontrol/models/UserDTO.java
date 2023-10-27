package edu.spbu.datacontrol.models;

import lombok.Data;

@Data
public class UserDTO {

  long id;

  String name;

  String email;

  String project;

  String department;

  UserDTO(User user) {
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.project = user.getProject();
    this.department = user.getDepartment();
  }
}
