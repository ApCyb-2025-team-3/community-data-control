package edu.spbu.datacontrol.commons;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ModifiedGroupDTO {

    private String name;

    private String description;

    private UUID teamLead;

    public ModifiedGroupDTO(String name, String description, UUID teamLead) {
        this.name = name;
        this.description = description;
        this.teamLead = teamLead;
    }
}