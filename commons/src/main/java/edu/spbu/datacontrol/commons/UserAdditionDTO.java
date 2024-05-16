package edu.spbu.datacontrol.commons;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAdditionDTO {

    private String name;

    private LocalDate dob;

    private String email;

    private String phoneNumber;

    private String supervisorName;

    private List<String> productOwnersNames;

    private String project;

    private String department;

    private String grade;

    private String role;

    private String mentorStatus;

    private LocalDate invitedAt;

    public UserAdditionDTO() {
    }

    public UserAdditionDTO(String name, LocalDate dob, String email, String phoneNumber,
                           String supervisorName, List<String> productOwnersNames, String project,
                           String department, String grade, String role, String mentorStatus, LocalDate invitedAt) {
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.supervisorName = supervisorName;
        this.productOwnersNames = productOwnersNames;
        this.project = project;
        this.department = department;
        this.grade = grade;
        this.role = role;
        this.mentorStatus = mentorStatus;
        this.invitedAt = invitedAt;
    }
}
