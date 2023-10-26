package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum Role {
    TEAM_MEMBER("TeamMember"),
    DATA_ENGINEER("DataEngineer"),
    DEVELOPER("Developer"),
    TEAM_LEAD("TeamLead"),
    PRODUCT_OWNER("ProductOwner");


    private final String description;

    Role(String description) {
        this.description = description;
    }
}