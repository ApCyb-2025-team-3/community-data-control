package edu.spbu.datacontrol.models;


import java.util.UUID;

import lombok.Data;

@Data
public class UserDTO {

    private UUID id;

    private String name;

    private String email;

    private String project;

    private String department;

    private String role;

    private String grade;

    public UserDTO() {}

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.project = user.getProject();
        this.department = user.getDepartment();
        this.role = user.getRole().toString();
        this.grade = user.getGrade().toString();
    }
}
