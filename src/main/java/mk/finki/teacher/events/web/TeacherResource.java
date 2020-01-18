package mk.finki.teacher.events.web;

import java.util.List;
import java.util.Map;

import mk.finki.teacher.events.models.Event;
import mk.finki.teacher.events.models.Teacher;
import mk.finki.teacher.events.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeacherResource {

    private final TeacherService teacherService;

    @Autowired
    public TeacherResource(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/teacher/events")
    public List<Teacher> getTeachers(){
        return teacherService.getAllTeachers();
    }

    @PostMapping("/teacher/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void addNewTeacher(@RequestParam String name) {
        teacherService.addTeacher(name);
    }

    @PostMapping("/teacher/events/add")
    public void addNewEventToTeacher(@RequestParam int teacher_id, @RequestParam int event_id){
        teacherService.addEventToTeacher(teacher_id, event_id);
    }

    @DeleteMapping("/teacher/events/remove")
    public void deleteEventFromTeacher(@RequestParam int teacher_id, @RequestParam int event_id){
        teacherService.removeEventFromTeacher(teacher_id, event_id);
    }

    @GetMapping("/teacher/events/{id}")
    public List<Event> getEventsForTeacher(@PathVariable("id") int teacher_id){
        return teacherService.getAllEventsByTeacherID(teacher_id);
    }

}
