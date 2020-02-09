package mk.finki.teacher.events.web;

import mk.finki.teacher.events.payload.JwtAuthenticationResponse;
import mk.finki.teacher.events.repository.TeacherRepository;
import mk.finki.teacher.events.services.CustomUserDetailsService;
import mk.finki.teacher.events.services.TeacherService;
import mk.finki.teacher.events.services.security.JwtTokenProvider;
import mk.finki.teacher.events.services.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@CrossOrigin("*")
@RestController
public class AuthResource {

    private final CustomUserDetailsService customUserDetailsService;

    private final TeacherService userServices;
    private final TeacherRepository userRepository;

    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    public AuthResource(CustomUserDetailsService customUserDetailsService, TeacherService userServices, TeacherRepository userRepository) {
        this.customUserDetailsService = customUserDetailsService;
        this.userServices = userServices;
        this.userRepository = userRepository;
    }

    @RequestMapping("/current_teacher")
    public UserPrincipal GetCurrentUser(HttpServletRequest request) throws Exception {
        String token = request.getHeader("Authorization").substring(7);
        int id = jwtTokenProvider.getUserIdFromJWT(token);
        UserPrincipal user = (UserPrincipal) customUserDetailsService.loadUserById(id);
        return user;
    }


    @PostMapping("/schedule/login/validate")
    public ResponseEntity<?> LoginUser(@RequestBody Map<String,String> body){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        body.get("userName"),
                        body.get("password")
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
}