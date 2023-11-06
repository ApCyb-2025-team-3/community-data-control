package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum GroupType {
    WORKING_TEAM("Work team"),
    INTEREST_GROUP("Interest group");

    private final String groupType;

    GroupType(String groupType) {
        this.groupType = groupType;
    }
}
