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

    public static EventType fromString(String text) {
        for (EventType x : EventType.values()) {
            if (x.eventName.equalsIgnoreCase(text)) {
                return x;
            }
        }
        throw new IllegalArgumentException(
            "No constant with name " + text + " found in " + Grade.class);
    }
}
