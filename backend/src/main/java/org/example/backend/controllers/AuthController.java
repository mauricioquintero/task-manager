package org.example.backend.controllers;

import org.example.backend.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody Map<String, String> request) {
        String token = authService.registerUser(request.get("username"), request.get("password"));
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestBody Map<String, String> request) {
        String token = authService.authenticateUser(request.get("username"), request.get("password"));
        return ResponseEntity.ok(Map.of("token", token));
    }
}
