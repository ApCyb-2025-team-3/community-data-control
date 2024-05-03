package edu.spbu.datacontrol.enums;

import lombok.Getter;

@Getter
public enum Role {
    MEMBER("Member"),
    DATA_ENGINEER("Data Engineer"),
    DEVELOPER("Developer"),
    TEAM_LEAD("Team Lead"),
    PRODUCT_OWNER("Product Owner"),
    SUPERVISOR("Supervisor"),
    NON_MEMBER("Non Member");

    private final String description;

    Role(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return this.getDescription();
    }
}
