package mk.finki.teacher.events.services;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import mk.finki.teacher.events.exceptions.DuplicateTeacherException;
import mk.finki.teacher.events.exceptions.EventNotFoundException;
import mk.finki.teacher.events.exceptions.TeacherNotFoundException;
import mk.finki.teacher.events.models.Event;
import mk.finki.teacher.events.models.Teacher;

public interface TeacherService {

    void addTeacher(String fullName) throws DuplicateTeacherException;
    void addEventToTeacher(int teacher_id, int event_id) throws TeacherNotFoundException, EventNotFoundException;
    void removeEventFromTeacher(int teacher_id, int event_id) throws TeacherNotFoundException, EventNotFoundException;
    void removeTeacher(int teacher_id) throws TeacherNotFoundException;
    List<Event> getAllEventsByTeacherID(int teacher_id) throws TeacherNotFoundException;
    List<Teacher> getAllTeachers();
    Teacher getTeacherByName(String name);
}

