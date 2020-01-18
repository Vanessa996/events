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

import java.util.List;

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
}
