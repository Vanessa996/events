package mk.finki.teacher.events.services;

import mk.finki.teacher.events.exceptions.DuplicateEventException;
import mk.finki.teacher.events.exceptions.EventNotFoundException;
import mk.finki.teacher.events.exceptions.InvalidDatesException;
import mk.finki.teacher.events.models.enums.EventType;

import java.time.LocalDateTime;
import java.util.Date;

public interface EventService {

    void createEvent(String eventName, LocalDateTime eventDateFrom, LocalDateTime eventDateTo, String location, EventType eventType) throws InvalidDatesException, DuplicateEventException;
    void updateEvent(int event_id, String eventName, LocalDateTime eventDateFrom, LocalDateTime eventDateTo, String location) throws EventNotFoundException;
    void removeEvent(int event_id) throws EventNotFoundException;

}
