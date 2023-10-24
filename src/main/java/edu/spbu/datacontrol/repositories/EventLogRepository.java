package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventLogRepository extends CrudRepository<Event, Long> {
    Event getEventById(Long eventId);

    List<Event> getEventsByUserId(Long userId);
}
