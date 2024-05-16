package edu.spbu.datacontrol.commons;

import lombok.Data;

@Data
public class GroupInfoDTO {

    private String name;

    private String type;

    private String description;

    public GroupInfoDTO(String name, String type, String description) {
        this.name = name;
        this.type = type;
        this.description = description;
    }
}
