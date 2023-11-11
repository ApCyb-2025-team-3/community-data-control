package edu.spbu.datacontrol.models;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;

@Getter
public class UserDataChangeDTO {

    @NotNull
    private UUID userId;

    private String name;

    private LocalDate dob;

    private String email;

    private String phoneNumber;

    private String department;
}
