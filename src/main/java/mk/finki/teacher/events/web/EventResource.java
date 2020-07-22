package mk.finki.teacher.events.web;

import java.time.format.DateTimeFormatter;
import java.util.List;

import mk.finki.teacher.events.exceptions.InvalidEventTypeException;
import mk.finki.teacher.events.models.Event;
import mk.finki.teacher.events.models.enums.EventType;
import mk.finki.teacher.events.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@CrossOrigin("*")
@RestController
public class EventResource {

    private final EventService eventService;

    @Autowired
    public EventResource(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/events")
    public List<Event> getAllEvents(){
        return eventService.listAllEvents();
    }

    @PostMapping(value = "/events/add", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void addEvent(@RequestBody Map<String,String> body) throws InvalidEventTypeException {

        EventType type = null;
        switch (body.get("eventType")){
            case "Conference": type = EventType.CONFERENCE; break;
            case "Event": type = EventType.EVENT; break;
            case "Jury": type = EventType.JURY; break;
            default: throw new InvalidEventTypeException();
        }

        eventService.createEvent(
                body.get("eventName"),
                LocalDateTime.parse(body.get("eventDateFrom"), DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                LocalDateTime.parse(body.get("eventDateTo"), DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                body.get("location"),
                type
        );
    }

    @PatchMapping(value = "/events/update", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void editEvent(@RequestBody Map<String, String> body){
        eventService.updateEvent(
                Integer.parseInt(body.get("event_id")),
                body.get("eventName"),
                LocalDateTime.parse(body.get("eventDateFrom")),
                LocalDateTime.parse(body.get("eventDateTo")),
                body.get("location")
        );
    }

    @DeleteMapping("/events/delete/{id}")
    public void deleteEvent(@PathVariable("id") int event_id){
        eventService.removeEvent(event_id);
    }

}
