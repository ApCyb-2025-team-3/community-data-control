package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum EventEnum {
    ADD_USER("Adding user"),
    DISMISSAL_USER("Dismissal user"),
    CHANGE_PROJECT("Change user project"),
    CHANGE_USER_DATA("Change user data"),
    UPDATE_USER_GRADE("Update user grade");

    private final String eventName;

    EventEnum(String eventName) {
        this.eventName = eventName;
    }
}
