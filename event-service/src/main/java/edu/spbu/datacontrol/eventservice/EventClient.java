package edu.spbu.datacontrol.eventservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.spbu.datacontrol.eventservice.models.Event;
import edu.spbu.datacontrol.eventservice.models.EventType;
import jdk.jshell.spi.ExecutionControl.NotImplementedException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

public class EventClient {

    private final String serviceUrl;
    private final RestTemplate client = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public EventClient(String serviceUrl) {
        this.serviceUrl = serviceUrl + "/api/event";
    }

    public Event getEventById(UUID eventId) {
        try {

            URI requestUri = new URI(serviceUrl + "/" + eventId);
            ResponseEntity<Event> response = client.getForEntity(requestUri, Event.class);

            return response.getBody();

        } catch (URISyntaxException e) {
            throw new RuntimeException("Wrong URI syntax!");
        }
    }

    public List<Event> getEventsByUserId(UUID userId) throws NotImplementedException {

        throw new NotImplementedException("Not yet implemented");
    }

    public boolean saveEvent(Event event) {

        try {

            URI requestUri = new URI(serviceUrl + "/add");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String eventJson = objectMapper.writeValueAsString(event);
            HttpEntity<String> request = new HttpEntity<>(eventJson, headers);

            ResponseEntity<String> response = client.postForEntity(requestUri, request, String.class);

            return response.getStatusCode().is2xxSuccessful();

        } catch (URISyntaxException e) {
            throw new RuntimeException("Wrong URI syntax!");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public Event getLastByUserAndType(UUID userId, EventType type) {

        try {

            URI requestUri = new URI(serviceUrl + "/lastByUserAndType?userId=" + userId + "&type=" + type);
            ResponseEntity<Event> response = client.getForEntity(requestUri, Event.class);

            return response.getBody();

        } catch (URISyntaxException e) {
            throw new RuntimeException("Wrong URI syntax!");
        }
    }
}
