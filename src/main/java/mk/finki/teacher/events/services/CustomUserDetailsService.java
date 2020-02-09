package mk.finki.teacher.events.services;

import mk.finki.teacher.events.models.Teacher;
import mk.finki.teacher.events.repository.TeacherRepository;
import mk.finki.teacher.events.services.security.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final TeacherRepository userRepository;

    public CustomUserDetailsService(TeacherRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Teacher teacher = userRepository.findByFullName(username);

        return UserPrincipal.create(teacher);
    }

    @Transactional
    public UserDetails loadUserById(int id) throws Exception {
        Teacher teacher = userRepository.findById(id).orElseThrow(
                Exception::new
        );
        return UserPrincipal.create(teacher);
    }
}