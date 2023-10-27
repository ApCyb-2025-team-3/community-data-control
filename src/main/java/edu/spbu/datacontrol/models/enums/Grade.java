package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum Grade {
    JUNIOR("Junior"),
    MIDDLE("Middle"),
    SENIOR("Senior"),
    TEAM_LEAD("TeamLead");
    UNSPECIFIED("Unspecified"); // Special grade for non-members such as administrative supervisors etc.

    private final String description;

    Grade(String description) {
        this.description = description;
    }
}
