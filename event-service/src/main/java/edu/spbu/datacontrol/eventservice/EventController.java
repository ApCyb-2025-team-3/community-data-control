package edu.spbu.datacontrol.eventservice;

import edu.spbu.datacontrol.eventservice.models.Event;
import edu.spbu.datacontrol.eventservice.models.EventType;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/event")
public class EventController {

    private final EventRepository eventLog;

    public EventController(EventRepository eventLog) {
        this.eventLog = eventLog;
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable UUID eventId) {

        Event result = eventLog.getEventById(eventId);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<String> saveEvent(@RequestBody Event event) {

        eventLog.save(event);
        return new ResponseEntity<>("Event saved", HttpStatus.OK);
    }

    @GetMapping("/lastByUserAndType")
    public ResponseEntity<Event> findLastEventByUserIdAndType(@RequestParam UUID userId, @RequestParam
        EventType type) {

        Event result = eventLog.findFirstByUserIdAndTypeOrderByCreatedAtDesc(userId, type);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
