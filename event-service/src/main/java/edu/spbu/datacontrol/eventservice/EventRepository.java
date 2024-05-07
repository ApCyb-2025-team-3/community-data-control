package edu.spbu.datacontrol.eventservice;

import edu.spbu.datacontrol.eventservice.models.Event;
import edu.spbu.datacontrol.eventservice.models.EventType;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<Event, UUID> {

    Event getEventById(UUID eventId);

    List<Event> getEventsByUserId(UUID userId);

    Event findFirstByUserIdAndTypeOrderByCreatedAtDesc(UUID userID, EventType type);
}
