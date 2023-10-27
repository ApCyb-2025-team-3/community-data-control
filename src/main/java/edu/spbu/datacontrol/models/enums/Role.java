package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum Role {
    MEMBER("Member"),
    DATA_ENGINEER("DataEngineer"),
    DEVELOPER("Developer"),
    TEAM_LEAD("TeamLead"),
    PRODUCT_OWNER("ProductOwner");
    NON_MEMBER("NonMember");


    private final String description;

    Role(String description) {
        this.description = description;
    }
}
