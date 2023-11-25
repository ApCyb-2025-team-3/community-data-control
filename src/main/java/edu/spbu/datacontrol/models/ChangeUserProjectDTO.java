package edu.spbu.datacontrol.models;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.UUID;

@Getter
public class ChangeUserProjectDTO {

    @NotNull
    private UUID userId;

    private String project;

    private String supervisor;

    private String department;

    private String[] productOwners;

    public ChangeUserProjectDTO() {
    }

    public ChangeUserProjectDTO(UUID userId, String project, String supervisor, String department,
                                String[] productOwners) {

        this.userId = userId;
        this.project = project;
        this.supervisor = supervisor;
        this.department = department;
        this.productOwners = productOwners;
    }
}
