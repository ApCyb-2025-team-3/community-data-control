package edu.spbu.datacontrol.models.enums;

public enum Role {
    FRONT_END("Front-End Development"),
    BACK_END("Back-End Development"),
    FULL_STACK("Full-Stack Development"),
    MOBILE("Mobile App Development"),
    DATABASE("Database Management"),
    SECURITY("Security and Ethical Hacking"),
    DEVOPS("DevOps and Continuous Integration"),
    AI_ML("Artificial Intelligence and Machine Learning"),
    DESIGN("UI/UX Design");

    private String description;

    Role(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
