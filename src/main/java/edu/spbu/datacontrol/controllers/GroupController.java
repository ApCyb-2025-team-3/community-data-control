package edu.spbu.datacontrol.controllers;

import edu.spbu.datacontrol.models.Event;
import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.User;
import edu.spbu.datacontrol.models.enums.EventType;
import edu.spbu.datacontrol.models.enums.GroupType;
import edu.spbu.datacontrol.repositories.EventRepository;
import edu.spbu.datacontrol.repositories.GroupRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    private GroupRepository groupRepository;
    private EventRepository eventLog;

    public GroupController(GroupRepository groupRepository, EventRepository eventRepository) {

        this.groupRepository = groupRepository;
        this.eventLog = eventRepository;
    }

    @PostMapping("/create")
    public String createGroup(@RequestParam GroupType type, @RequestParam String name, @RequestParam String description, @RequestParam User teamLead) {

        Group newGroup = new Group(type, name, description, teamLead);
        try {
            assignTeamLead(newGroup, teamLead);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(409), e.getMessage());
        }

        newGroup = groupRepository.save(newGroup);
        Event groupCreation = new Event(newGroup.getId(), EventType.CREATE_GROUP, "");
        eventLog.save(groupCreation);

        return "Group successfully created.";
    }

    public void assignTeamLead(Group group, User teamLead) {

    }
}
