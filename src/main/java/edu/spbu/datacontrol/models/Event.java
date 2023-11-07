package edu.spbu.datacontrol.models;

import edu.spbu.datacontrol.models.enums.EventType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

import java.util.Date;
import java.util.UUID;

import lombok.Data;
import jakarta.persistence.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@Table(name = "event_log")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID userId;

    @Enumerated(EnumType.STRING)
    private EventType type;

    @CreatedDate
    private Date createdAt;

    private String previousValue;

    private String newValue;

    private String description;

    public Event() {}

    public Event(UUID userId, EventType type, String description) {
        this.userId = userId;
        this.type = type;
        this.description = description;
    }
}
