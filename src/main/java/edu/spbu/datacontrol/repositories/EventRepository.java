package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Event;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventRepository extends CrudRepository<Event, UUID> {

    Event getEventById(UUID eventId);

    List<Event> getEventsByUserId(UUID userId);
}
