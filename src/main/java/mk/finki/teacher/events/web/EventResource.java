package mk.finki.teacher.events.web;

import mk.finki.teacher.events.models.enums.EventType;
import mk.finki.teacher.events.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class EventResource {

    private final EventService eventService;

    @Autowired
    public EventResource(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/events/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addEvent(@RequestBody Map<String,String> body){

        EventType type = null;
        switch (body.get("eventType")){
            case "Conference": type = EventType.CONFERENCE; break;
            case "Event": type = EventType.EVENT; break;
            case "Jury": type = EventType.JURY; break;
            default: break;
        }

        eventService.createEvent(
                body.get("eventName"),
                LocalDateTime.parse(body.get("eventDateFrom")),
                LocalDateTime.parse(body.get("eventDateTo")),
                body.get("location"),
                type
        );
    }

    @PatchMapping("/events/update/")
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
    public void deleteEvent(@RequestParam int event_id){
        eventService.removeEvent(event_id);
    }

}
