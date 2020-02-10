package mk.finki.teacher.events.services.impl;

import mk.finki.teacher.events.exceptions.DuplicateTeacherException;
import mk.finki.teacher.events.exceptions.EventNotFoundException;
import mk.finki.teacher.events.exceptions.TeacherNotFoundException;
import mk.finki.teacher.events.models.Event;
import mk.finki.teacher.events.models.Teacher;
import mk.finki.teacher.events.repository.EventRepository;
import mk.finki.teacher.events.repository.TeacherRepository;
import mk.finki.teacher.events.services.TeacherService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@Service
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final EventRepository eventRepository;

    public TeacherServiceImpl(TeacherRepository teacherRepository, EventRepository eventRepository) {
        this.teacherRepository = teacherRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public void addTeacher(String fullName) throws DuplicateTeacherException{
        if(teacherRepository.findByFullName(fullName) != null) throw new DuplicateTeacherException();

        teacherRepository.save(new Teacher(fullName));
    }

    @Override
    public void addEventToTeacher(int teacher_id, int event_id) throws TeacherNotFoundException, EventNotFoundException {

        Teacher teacher = teacherRepository.findById(teacher_id).orElseThrow(TeacherNotFoundException::new);
        List<Event> events = teacher.getEvents();
        Event event = eventRepository.findById(event_id).orElseThrow(EventNotFoundException::new);
        events.add(event);
        teacherRepository.save(teacher);

    }

    @Override
    public void removeEventFromTeacher(int teacher_id, int event_id) throws TeacherNotFoundException, EventNotFoundException {
        Teacher teacher = teacherRepository.findById(teacher_id).orElseThrow(TeacherNotFoundException::new);
        List<Event> events = teacher.getEvents();
        Event event = eventRepository.findById(event_id).orElseThrow(EventNotFoundException::new);
        events.remove(event);
        teacherRepository.save(teacher);
    }

    @Override
    public void removeTeacher(int teacher_id) throws TeacherNotFoundException {
        Teacher teacher = teacherRepository.findById(teacher_id).orElseThrow(TeacherNotFoundException::new);
        for(Event e : teacher.getEvents()){
            removeEventFromTeacher(teacher_id, e.getEvent_id());
        }
        teacherRepository.deleteById(teacher_id);
    }

    @Override
    public List<Event> getAllEventsByTeacherID(int teacher_id) throws TeacherNotFoundException{
        Teacher teacher = teacherRepository.findById(teacher_id).orElseThrow(TeacherNotFoundException::new);
        return teacher.getEvents();
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getTeacherByName(String name){
        String[] teacherName = name.split(Pattern.quote("."));
        String first = "";
        if(teacherName.length > 1)
            first = teacherName[0].substring(0, 1).toUpperCase() + teacherName[0].substring(1) + " " + teacherName[1].substring(0, 1).toUpperCase() + teacherName[1].substring(1);
        else
            first = name.substring(0, 1).toUpperCase() + name.substring(1);
        System.out.println(first);
        return teacherRepository.findByFullName(first);
    }
}
