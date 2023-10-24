package edu.spbu.datacontrol.models.enums;

import lombok.Getter;

@Getter
public enum EventType {
    ADD_USER("AddingUser"),
    DISMISS_USER("DismissalUser"),
    CHANGE_PROJECT("ChangeUserProject"),
    CHANGE_USER_DATA("ChangeUserData"),
    UPDATE_USER_GRADE("UpdateUserGrade");

    private final String eventName;

    EventType(String eventName) {
        this.eventName = eventName;
    }
}
