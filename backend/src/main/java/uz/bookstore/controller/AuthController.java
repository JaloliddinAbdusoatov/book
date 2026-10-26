package uz.bookstore.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import uz.bookstore.config.JwtUtil;
import uz.bookstore.dto.LoginRequest;
import uz.bookstore.dto.LoginResponse;
import uz.bookstore.entity.AdminUser;
import uz.bookstore.repository.AdminUserRepository;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(AdminUserRepository adminUserRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        AdminUser admin = adminUserRepository.findByUsername(request.username())
                .filter(AdminUser::getIsActive)
                .filter(a -> passwordEncoder.matches(request.password(), a.getPasswordHash()))
                .orElse(null);

        if (admin == null) {
            return ResponseEntity.status(401).build();
        }

        String token = jwtUtil.generateToken(admin.getUsername());

        return ResponseEntity.ok(new LoginResponse(
                token,
                admin.getUsername(),
                admin.getFullName()
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<LoginResponse> getCurrentUser(
            @RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).build();
        }

        String username = jwtUtil.extractUsername(token);
        AdminUser admin = adminUserRepository.findByUsername(username).orElse(null);

        if (admin == null || !admin.getIsActive()) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(new LoginResponse(token, admin.getUsername(), admin.getFullName()));
    }
}
