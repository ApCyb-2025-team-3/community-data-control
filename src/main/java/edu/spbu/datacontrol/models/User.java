package edu.spbu.datacontrol.models;

import edu.spbu.datacontrol.models.enums.EnumUtils;
import edu.spbu.datacontrol.models.enums.Grade;
import edu.spbu.datacontrol.models.enums.MentorshipStatus;
import edu.spbu.datacontrol.models.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private LocalDate invitedAt;

    private boolean isActive = true;

    private String name;

    private LocalDate dob;

    private String email;

    private String phoneNumber;

    @ManyToOne
    private User supervisor;

    @ManyToMany
    private List<User> productOwners;

    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Group> groups;

    private String project;

    private LocalDate projectChangedAt;

    private String department;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private MentorshipStatus mentorStatus;

    public User(UserAdditionDTO userData) {
        this.invitedAt = userData.getInvitedAt();
        this.name = userData.getName();
        this.dob = userData.getDob();
        this.email = userData.getEmail();
        this.phoneNumber = userData.getPhoneNumber();
        this.project = userData.getProject();
        this.department = userData.getDepartment();

        try {
            this.grade = EnumUtils.fromString(Grade.class, userData.getGrade());
        } catch (IllegalArgumentException e) {
            this.grade = Grade.UNSPECIFIED;
        }

        try {
            this.role = EnumUtils.fromString(Role.class, userData.getRole());
        } catch (IllegalArgumentException e) {
            this.role = Role.NON_MEMBER;
        }

        try {
            this.mentorStatus = EnumUtils.fromString(MentorshipStatus.class,
                userData.getMentorStatus());
        } catch (IllegalArgumentException e) {
            this.mentorStatus = MentorshipStatus.NOT_PARTICIPATING;
        }
    }

    public User() {}

    public void changePersonalData(UserDataChangeDTO modifiedData) {

        this.name = modifiedData.getName() != null ? modifiedData.getName() : this.name;
        this.dob = modifiedData.getDob() != null ? modifiedData.getDob() : this.dob;
        this.email = modifiedData.getEmail() != null ? modifiedData.getEmail() : this.email;
        this.phoneNumber = modifiedData.getPhoneNumber() != null ? modifiedData.getPhoneNumber()
            : this.phoneNumber;
    }

    public boolean hasMentorshipStatus(MentorshipStatus status){
        return status == mentorStatus;

    }
}
