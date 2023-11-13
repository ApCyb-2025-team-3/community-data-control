package edu.spbu.datacontrol.models;

import java.util.UUID;

import edu.spbu.datacontrol.models.enums.GroupType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class GroupDTO {

    @NotNull
    private UUID id;

    private String name;

    private GroupType type;

    private String description;

    private User teamLead;

}
