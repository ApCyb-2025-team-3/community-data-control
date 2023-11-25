package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum EventType {
    ADD_USER("Add user"),
    DISMISS_USER("Dismiss user"),
    CHANGE_PROJECT("Change project"),
    CHANGE_GRADE("Update grade"),
    CHANGE_ROLE("Update role"),
    CHANGE_PERSONAL_DATA("Change personal data"),
    CREATE_GROUP("Create group"),
    DISBAND_GROUP("Disband group");


    private final String eventName;

    EventType(String eventName) {
        this.eventName = eventName;
    }
}
