package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum EventType {
    ADD_USER("AddUser"),
    DISMISS_USER("DismissUser"),
    CHANGE_PROJECT("ChangeProject"),
    CHANGE_USER_DATA("ChangeUserData"),
    UPDATE_USER_GRADE("UpdateUserGrade");

    private final String eventName;

    EventType(String eventName) {
        this.eventName = eventName;
    }
}
