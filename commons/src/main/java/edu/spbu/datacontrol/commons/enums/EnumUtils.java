package edu.spbu.datacontrol.commons.enums;

public class EnumUtils {

    private EnumUtils() {}

    public static <T extends Enum<T>> T fromString(Class<T> enumeration, String text) {

        for (T enumValue : enumeration.getEnumConstants()) {
            if (enumValue.toString().equalsIgnoreCase(text)) {
                return enumValue;
            }
        }
        throw new IllegalArgumentException(
            "No constant with name " + text + " found in " + enumeration);
    }

}
