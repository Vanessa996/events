package mk.finki.teacher.events.repository;

import mk.finki.teacher.events.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {

    Teacher findByFullName(String name);

}
