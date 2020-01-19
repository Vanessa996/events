package mk.finki.teacher.events.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_ACCEPTABLE,reason = "Invalid Event Type Exception")
public class InvalidEventTypeException extends RuntimeException {

}
