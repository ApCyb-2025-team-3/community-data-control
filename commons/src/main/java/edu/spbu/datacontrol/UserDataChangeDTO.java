package edu.spbu.datacontrol;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDataChangeDTO {

    @NotNull
    private UUID userId;

    private String name;

    private LocalDate dob;

    private String email;

    private String phoneNumber;
}
