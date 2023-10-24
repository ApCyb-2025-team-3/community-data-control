package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum EventEnum {
    ADD_WORKER("Adding worker"),
    DISMISSAL_WORKER("Dismissal worker"),
    CHANGE_PROJECT("Change worker project"),
    CHANGE_USER_DATA("Change user data"),
    UPDATE_WORKER_GRADE("Update worker grade");

    private final String eventName;

    EventEnum(String eventName) {
        this.eventName = eventName;
    }
}
