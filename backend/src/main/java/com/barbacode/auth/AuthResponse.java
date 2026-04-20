package com.barbacode.auth;

public record AuthResponse(String accessToken, String tokenType, String role) {
}
