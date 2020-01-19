package mk.finki.teacher.events.web;

import java.util.List;
import java.util.Map;

import mk.finki.teacher.events.models.Event;
import mk.finki.teacher.events.models.Teacher;
import mk.finki.teacher.events.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class TeacherResource {

    private final TeacherService teacherService;

    @Autowired
    public TeacherResource(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/teacher")
    public List<Teacher> getTeachers(){
        return teacherService.getAllTeachers();
    }

    @PostMapping("/teacher/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void addNewTeacher(@RequestParam String name) {
        teacherService.addTeacher(name);
    }

    @PostMapping("/teacher/{teacher_id}/events/add/{event_id}")
    public void addNewEventToTeacher(@PathVariable("teacher_id") int teacher_id, @PathVariable("event_id") int event_id){
        teacherService.addEventToTeacher(teacher_id, event_id);
    }

    @DeleteMapping("/teacher/{teacher_id}/events/remove/{event_id}")
    public void deleteEventFromTeacher(@PathVariable("teacher_id") int teacher_id, @PathVariable("event_id") int event_id){
        teacherService.removeEventFromTeacher(teacher_id, event_id);
    }

    @GetMapping("/teacher/{id}/events")
    public List<Event> getEventsForTeacher(@PathVariable("id") int teacher_id){
        return teacherService.getAllEventsByTeacherID(teacher_id);
    }

    @DeleteMapping("/teacher/delete/{id}")
    public void deleteTeacherById(@PathVariable("id") int teacher_id){
        teacherService.removeTeacher(teacher_id);
    }
}
