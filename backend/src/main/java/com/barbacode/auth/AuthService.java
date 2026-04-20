package com.barbacode.auth;

import com.barbacode.security.JwtService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final JwtService jwtService;

    public AuthService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    public AuthResponse login(AuthRequest request) {
        String token = jwtService.generateToken(request.username(), "ADMIN");
        return new AuthResponse(token, "Bearer", "ADMIN");
    }
}
