package edu.spbu.datacontrol.userservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.spbu.datacontrol.commons.UserDTO;
import edu.spbu.datacontrol.eventservice.models.Event;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class UserClient {

    private final String serviceUrl;
    private final RestTemplate client = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public UserClient(String serviceUrl) {
        this.serviceUrl = serviceUrl + "/api/user";
    }

    public UserDTO getUserById(UUID userId) {
        try {

            URI requestUri = new URI(serviceUrl + "/" + userId);
            ResponseEntity<UserDTO> response = client.getForEntity(requestUri, UserDTO.class);

            return response.getBody();

        } catch (URISyntaxException e) {
            throw new RuntimeException("Wrong URI syntax!");
        }
    }

}
