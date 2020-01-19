package mk.finki.teacher.events.services.impl;

import mk.finki.teacher.events.exceptions.DuplicateEventException;
import mk.finki.teacher.events.exceptions.EventNotFoundException;
import mk.finki.teacher.events.exceptions.InvalidDatesException;
import mk.finki.teacher.events.models.Event;
import mk.finki.teacher.events.models.enums.EventType;
import mk.finki.teacher.events.repository.EventRepository;
import mk.finki.teacher.events.services.EventService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public void createEvent(String eventName, LocalDateTime eventDateFrom, LocalDateTime eventDateTo, String location, EventType eventType) throws InvalidDatesException, DuplicateEventException {
        if(eventDateFrom.isAfter(eventDateTo)) throw new InvalidDatesException();
        if(eventRepository.findByEventName(eventName) != null) throw new DuplicateEventException();

        eventRepository.save(new Event(eventName, eventDateFrom, eventDateTo, location, eventType));
    }

    @Override
    public void updateEvent(int event_id, String eventName, LocalDateTime eventDateFrom, LocalDateTime eventDateTo, String location) throws EventNotFoundException{
        Event event = eventRepository.findById(event_id).orElseThrow(EventNotFoundException::new);

        if(!event.getEventName().equals(eventName)) event.setEventName(eventName);
        if(!event.getEventDateFrom().isEqual(eventDateFrom)) event.setEventDateFrom(eventDateFrom);
        if(!event.getEventDateTo().isEqual(eventDateTo) && (eventDateTo.isEqual(event.getEventDateFrom()) || eventDateTo.isAfter(event.getEventDateFrom()))) event.setEventDateTo(eventDateTo);
        if(!event.getLocation().equals(location)) event.setLocation(location);

        eventRepository.save(event);
    }

    @Override
    public void removeEvent(int event_id) throws EventNotFoundException{
        Event event = eventRepository.findById(event_id).orElseThrow(EventNotFoundException::new);
        eventRepository.delete(event);
    }

    @Override
    public List<Event> listAllEvents() {
        return eventRepository.findAll();
    }
}
