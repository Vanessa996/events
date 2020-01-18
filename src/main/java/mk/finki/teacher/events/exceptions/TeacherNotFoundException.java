package mk.finki.teacher.events.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND,reason = "Teacher not found exception")
public class TeacherNotFoundException extends RuntimeException  {
}
