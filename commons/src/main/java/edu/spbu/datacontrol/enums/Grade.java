package edu.spbu.datacontrol.enums;

import lombok.Getter;

@Getter
public enum Grade {
    JUNIOR("Junior"),
    MIDDLE("Middle"),
    SENIOR("Senior"),
    TEAM_LEAD("Team Lead"),
    // Special grade for non-members such as administrative supervisors etc.
    UNSPECIFIED("Unspecified");

    private final String description;

    Grade(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.getDescription();
    }
}
