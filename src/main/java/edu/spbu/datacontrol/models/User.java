package edu.spbu.datacontrol.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import edu.spbu.datacontrol.models.enums.*;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    @CreatedDate
    Date invitedAt;

    boolean isActive;

    String name;

    Date dob;

    String email;

    String phoneNumber;

    @OneToOne
    User supervisor;

    @OneToOne
    User teamLead;

    @OneToMany
    List<User> productOwnersIds;

    String project;

    String department;

    @Enumerated(EnumType.STRING)
    Grade grade;

    @Enumerated(EnumType.STRING)
    Role role;

    @Enumerated(EnumType.STRING)
    MentorshipStatus mentorStatus;
}
