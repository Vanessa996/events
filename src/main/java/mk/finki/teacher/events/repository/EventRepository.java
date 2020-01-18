package mk.finki.teacher.events.repository;


import mk.finki.teacher.events.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Event findByEventName(String name);

}
