package edu.spbu.datacontrol.userservice.models;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

import lombok.Getter;

import java.util.UUID;

@Getter
public class ChangeUserProjectDTO {

    @NotNull
    private UUID userId;

    private String project;

    private String supervisor;

    private String department;

    private LocalDate changedAt;

    private String[] productOwners;

    public ChangeUserProjectDTO() {
    }

    public ChangeUserProjectDTO(UUID userId, String project, String supervisor, String department,
                                LocalDate changedAt, String[] productOwners) {

        this.userId = userId;
        this.project = project;
        this.supervisor = supervisor;
        this.department = department;
        this.changedAt = changedAt;
        this.productOwners = productOwners;
    }
}
