package edu.spbu.datacontrol.models;

import edu.spbu.datacontrol.models.enums.EventType;
import jakarta.persistence.Converter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

import java.util.Date;
import java.util.UUID;

import lombok.Data;
import jakarta.persistence.Id;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Data
@Table(name = "event_log")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    UUID userId;

    EventType type;

    @CreatedDate
    Date createdAt;

    String previousValue;

    String newValue;

    String description;

    public Event() {}

    public Event(UUID userId, EventType type, String description) {
        this.userId = userId;
        this.type = type;
        this.description = description;
    }
}
