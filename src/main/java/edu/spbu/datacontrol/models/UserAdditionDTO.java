package edu.spbu.datacontrol.models;

import java.util.Date;
import java.util.List;
import lombok.Getter;

@Getter
public class UserAdditionDTO {

    String name;

    Date dob;

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

}
