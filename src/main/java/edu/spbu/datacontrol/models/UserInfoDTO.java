package edu.spbu.datacontrol.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDTO {

    @NotNull
    private UUID id;

    private LocalDate invitedAt;

    private LocalDate dismissedAt;

    private String dismissReason;

    private Boolean isActive;

    private String name;

    private LocalDate dob;

    private String email;

    private String phoneNumber;

    private Pair<UUID, String> supervisor;

    private List<Pair<UUID, String>> productOwners;

    private String project;

    private LocalDate projectChangedAt;

    private String department;

    private String grade;

    private String role;

    private String mentorStatus;

    @JsonCreator
    public UserInfoDTO() {
    }

    public UserInfoDTO(User user) {
        this.id = user.getId();
        this.invitedAt = user.getInvitedAt();
        this.isActive = user.isActive();
        this.name = user.getName();
        this.dob = user.getDob();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhoneNumber();
        User supervisor = user.getSupervisor();
        if (supervisor != null) {
            this.supervisor = new Pair<>(supervisor.getId(), supervisor.getName());
        }
        this.productOwners = user.getProductOwners().stream()
            .map(u -> new Pair<>(u.getId(), u.getName())).toList();
        this.project = user.getProject();
        this.department = user.getDepartment();
        this.grade = user.getGrade().toString();
        this.role = user.getRole().toString();
        this.mentorStatus = user.getMentorStatus().toString();
    }

    @Getter
    public static class Pair<K, V> {

        private K id;
        private V value;

        @JsonCreator
        Pair() {}

        Pair(K id, V value) {
            this.id = id;
            this.value = value;
        }
    }
}
