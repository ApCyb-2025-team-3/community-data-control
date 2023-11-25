package edu.spbu.datacontrol.models;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class GroupDataChangedDTO {

    @NotNull
    private UUID id;

    private String name;

    private String description;

    private UUID teamLead;

}
