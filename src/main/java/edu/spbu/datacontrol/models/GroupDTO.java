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

    private String description;

    private UUID teamLead;

    public GroupDTO(Group group) {
        this.id = group.getId();
        this.name = group.getName();
        this.description = group.getDescription();
        this.teamLead = (group.getTeamLead()).getId();
    }

}
