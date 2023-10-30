package edu.spbu.datacontrol.models;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;

@Getter
public class UserAdditionDTO {

    String name;

    LocalDate dob;

    String email;

    String phoneNumber;

    String supervisorName;

    String teamLeadName;

    List<String> productOwnersNames;

    String project;

    String department;

    String grade;

    String role;

    String mentorStatus;

    public UserAdditionDTO() {}

    public UserAdditionDTO(String name, LocalDate dob, String email, String phoneNumber,
        String supervisorName, String teamLeadName, List<String> productOwnersNames, String project,
        String department, String grade, String role, String mentorStatus) {
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.supervisorName = supervisorName;
        this.teamLeadName = teamLeadName;
        this.productOwnersNames = productOwnersNames;
        this.project = project;
        this.department = department;
        this.grade = grade;
        this.role = role;
        this.mentorStatus = mentorStatus;
    }
}
