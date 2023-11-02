package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum Role {
    MEMBER("Member"),
    DATA_ENGINEER("DataEngineer"),
    DEVELOPER("Developer"),
    TEAM_LEAD("TeamLead"),
    PRODUCT_OWNER("ProductOwner"),
    SUPERVISOR("Supervisor"),
    NON_MEMBER("NonMember");


    private final String description;

    Role(String description) {
        this.description = description;
    }

    public static Role fromString(String text) {
        for (Role x : Role.values()) {
            if (x.description.equalsIgnoreCase(text)) {
                return x;
            }
        }
        throw new IllegalArgumentException(
            "No constant with name " + text + " found in " + Role.class);
    }
}
