package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum Grade {
    JUNIOR("Junior"),
    MIDDLE("Middle"),
    SENIOR("Senior"),
    TEAM_LEAD("TeamLead"),
    // Special grade for non-members such as administrative supervisors etc.
    UNSPECIFIED("Unspecified");
    private final String description;

    Grade(String description) {
        this.description = description;
    }

    public static Grade fromString(String text) {
        for (Grade x : Grade.values()) {
            if (x.description.equalsIgnoreCase(text)) {
                return x;
            }
        }
        throw new IllegalArgumentException(
            "No constant with name " + text + " found in " + Grade.class);
    }
}
