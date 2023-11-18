package edu.spbu.datacontrol.models;

import lombok.Data;

@Data
public class GroupCreationDTO {

    private String name;

    private String type;

    private String description;

    public GroupCreationDTO(String name, String type, String description) {
        this.name = name;
        this.type = type;
        this.description = description;
    }
}

