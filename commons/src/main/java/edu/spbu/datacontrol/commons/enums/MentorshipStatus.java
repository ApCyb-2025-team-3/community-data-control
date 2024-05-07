package edu.spbu.datacontrol.commons.enums;

import lombok.Getter;

@Getter
public enum MentorshipStatus {
    MENTOR("Mentor"),
    MENTEE("Mentee"),
    NOT_PARTICIPATING("Not participating");

    private final String statusName;

    MentorshipStatus(String statusName) {
        this.statusName = statusName;
    }
}
