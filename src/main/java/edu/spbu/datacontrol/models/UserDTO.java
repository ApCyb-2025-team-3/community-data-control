package edu.spbu.datacontrol.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.UUID;
import lombok.Data;

@Data
public class UserDTO {

    private UUID id;

    private String name;

    private String email;

    private String project;

    private String department;

    public UserDTO() {}

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.project = user.getProject();
        this.department = user.getDepartment();
    }
}
