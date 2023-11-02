package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum MentorshipStatus {
    MENTOR("Mentor", "Participant in the role of a mentor"),
    MENTEE("Mentee", "Participant in the role of a mentee"),
    NOT_PARTICIPATING("Not participating", "Not participating in the mentorship program");


    private final String statusName;
    private final String description;

    MentorshipStatus(String statusName, String description) {
        this.statusName = statusName;
        this.description = description;
    }

    public static MentorshipStatus fromString(String text) {
        for (MentorshipStatus x : MentorshipStatus.values()) {
            if (x.statusName.equalsIgnoreCase(text)) {
                return x;
            }
        }
        throw new IllegalArgumentException(
            "No constant with name " + text + " found in " + Role.class);
    }
}
