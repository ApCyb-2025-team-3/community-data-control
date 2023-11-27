package edu.spbu.datacontrol.models;

import java.util.Date;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;



@Data
public class GroupDTO {

    @NotNull
    private UUID id;

    private String name;

    private boolean isActive;

    private String description;

    private Date creationDate;

    private Date dusbandmentDate;

    private String teamLeadName;

    public GroupDTO(Group group) {
        this.id = group.getId();
        this.name = group.getName();
        this.isActive = group.isActive();
        this.description = group.getDescription();
        this.creationDate = group.getCreationDate();
        this.dusbandmentDate = group.getDisbandmentDate();
        this.teamLeadName = group.isActive() ? group.getTeamLead().getName() : "None";
    }

}
