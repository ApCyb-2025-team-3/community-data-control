package edu.spbu.datacontrol.models;

import edu.spbu.datacontrol.models.enums.EnumUtils;
import edu.spbu.datacontrol.models.enums.GroupType;
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
