package mk.finki.teacher.events.models.enums;

import java.util.ArrayList;
import java.util.List;

public enum EventType {
    CONFERENCE("Conference"),
    EVENT("Event"),
    JURY("Jury");

    EventType(String name) {
    }

    public List<String> eventTypeValues(){
        List<String> values = new ArrayList<>();
        for(EventType v : EventType.values()){
            values.add(v.name());
        }
        return values;
    }
}
