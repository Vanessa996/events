package mk.finki.teacher.events.services;

import java.util.List;

import mk.finki.teacher.events.exceptions.DuplicateTeacherException;
import mk.finki.teacher.events.exceptions.EventNotFoundException;
import mk.finki.teacher.events.exceptions.TeacherNotFoundException;
import mk.finki.teacher.events.models.Event;
import mk.finki.teacher.events.models.Teacher;

public interface TeacherService {

    void addTeacher(String fullName) throws DuplicateTeacherException;
    void addEventToTeacher(int teacher_id, int event_id) throws TeacherNotFoundException, EventNotFoundException;
    void removeEventFromTeacher(int teacher_id, int event_id) throws TeacherNotFoundException, EventNotFoundException;
    List<Event> getAllEventsByTeacherID(int teacher_id) throws TeacherNotFoundException;
    List<Teacher> getAllTeachers();
}
