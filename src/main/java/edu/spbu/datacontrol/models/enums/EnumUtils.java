package edu.spbu.datacontrol.models.enums;

public class EnumUtils {

    private EnumUtils() {}

    public static <T extends Enum<T>> T fromString(Class<T> enumeration, String text) {

        String processedText = text.replace(" ", "_");

        for (T enumValue : enumeration.getEnumConstants()) {
            if (enumValue.toString().equalsIgnoreCase(processedText)) {
                return enumValue;
            }
        }
        throw new IllegalArgumentException(
            "No constant with name " + text + " found in " + enumeration);
    }

}
