package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum Grade {
    JUNIOR("Junior"),
    MIDDLE("Middle"),
    SENIOR("Senior"),
    TEAM_LEAD("TeamLead");

    private final String description;

    Grade(String description) {
        this.description = description;
    }
}
