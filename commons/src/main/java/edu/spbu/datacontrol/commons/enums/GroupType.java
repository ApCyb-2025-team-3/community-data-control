package edu.spbu.datacontrol.commons.enums;

import lombok.Getter;

@Getter
public enum GroupType {
    WORKING_TEAM("Work team"),
    INTEREST_GROUP("Interest group");

    private final String nameType;

    GroupType(String nameType) {
        this.nameType = nameType;
    }
}
