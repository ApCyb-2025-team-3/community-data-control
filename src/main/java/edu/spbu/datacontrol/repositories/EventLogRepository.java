package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventLogRepository extends CrudRepository<Event, Long> {
    long addEvent(Event event);

    Event getEventById(long eventId);

    List<Event> getEventsByUserId(long userId);
}
