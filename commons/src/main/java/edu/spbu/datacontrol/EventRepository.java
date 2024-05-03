package edu.spbu.datacontrol;

import edu.spbu.datacontrol.Event;
import edu.spbu.datacontrol.enums.EventType;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface EventRepository extends CrudRepository<Event, UUID> {

    Event getEventById(UUID eventId);

    List<Event> getEventsByUserId(UUID userId);

    Event findFirstByUserIdAndTypeOrderByCreatedAtDesc(UUID userID, EventType type);
}
