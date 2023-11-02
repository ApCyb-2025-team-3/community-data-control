package edu.spbu.datacontrol.models;

import jakarta.persistence.*;

import java.time.LocalDate;
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
    private UUID id;

    @CreatedDate
    private Date invitedAt;

    private boolean isActive = true;

    private String name;

    private LocalDate dob;

    private String email;

    private String phoneNumber;

    @OneToOne
    private User supervisor;

    @OneToOne
    private User teamLead;

    @OneToMany
    private List<User> productOwners;

    private String project;

    private String department;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private MentorshipStatus mentorStatus;

    public User(UserAdditionDTO userData) {
        this.name = userData.getName();
        this.dob = userData.getDob();
        this.email = userData.getEmail();
        this.phoneNumber = userData.getPhoneNumber();
        this.project = userData.getProject();
        this.department = userData.getDepartment();

        try {
            this.grade = Grade.fromString(userData.getGrade());
        } catch (IllegalArgumentException e) {
            this.grade = Grade.UNSPECIFIED;
        }

        try {
            this.role = Role.fromString(userData.getRole());
        } catch (IllegalArgumentException e) {
            this.role = Role.NON_MEMBER;
        }

        try {
            this.mentorStatus = MentorshipStatus.fromString(userData.getMentorStatus());
        } catch (IllegalArgumentException e) {
            this.mentorStatus = MentorshipStatus.NOT_PARTICIPATING;
        }
    }

    public User() {}
}
