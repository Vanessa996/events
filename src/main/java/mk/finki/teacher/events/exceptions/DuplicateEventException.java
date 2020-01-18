package mk.finki.teacher.events.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "Duplicate event exception")
public class DuplicateEventException extends RuntimeException {
}

