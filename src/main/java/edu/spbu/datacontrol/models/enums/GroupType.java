package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum GroupType {
    WORKING_TEAM("Work team"),
    INTEREST_GROUP("Interest group");

    private final String grType;

    GroupType(String grType) {
        this.grType = grType;
    }
}
