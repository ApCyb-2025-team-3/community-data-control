package edu.spbu.datacontrol.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import edu.spbu.datacontrol.models.enums.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @CreatedDate
    Date invitedAt;

    boolean isActive = true;

    String name;

    Date dob;

    String email;

    String phoneNumber;

    @OneToOne
    User supervisor;

    @OneToOne
    User teamLead;

    @OneToMany
    List<User> productOwners;

    String project;

    String department;

    @Enumerated(EnumType.STRING)
    Grade grade;

    @Enumerated(EnumType.STRING)
    Role role;

    @Enumerated(EnumType.STRING)
    MentorshipStatus mentorStatus;

    public User(UserAdditionDTO userData) {
        this.name = userData.name;
        this.dob = userData.dob;
        this.email = userData.email;
        this.phoneNumber = userData.phoneNumber;
        this.project = userData.project;
        this.department = userData.department;

        try {
            this.grade = Grade.valueOf(userData.grade);
        } catch (IllegalArgumentException e) {
            this.grade = Grade.UNSPECIFIED;
        }

        try {
            this.role = Role.valueOf(userData.role);
        } catch (IllegalArgumentException e) {
            this.role = Role.NON_MEMBER;
        }

        try {
            this.mentorStatus = MentorshipStatus.valueOf(userData.mentorStatus);
        } catch (IllegalArgumentException e) {
            this.mentorStatus = MentorshipStatus.NOT_PARTICIPATING;
        }
    }

    public User() {}
}
