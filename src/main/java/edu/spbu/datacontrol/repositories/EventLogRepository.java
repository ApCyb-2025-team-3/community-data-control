package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Event;
import org.springframework.data.repository.CrudRepository;

public interface EventLogRepository extends CrudRepository<Event, Long> {

}
