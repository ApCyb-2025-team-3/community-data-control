package edu.spbu.datacontrol.enums;

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
    DISBAND_GROUP("Disband group"),
    ACCEPT_TO_GROUP("Accept user to group"),
    EXCLUDE_FROM_GROUP("Exclude user from group"),
    JOINING_THE_MENTORING_PROGRAM("Joining the mentoring program"),
    EXIT_FROM_THE_MENTORING_PROGRAM("Exit from the mentoring program");

    private final String eventName;

    EventType(String eventName) {
        this.eventName = eventName;
    }
}
