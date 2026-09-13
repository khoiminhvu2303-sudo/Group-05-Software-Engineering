package com.library.service;

import com.library.dto.request.LoginDTO;
import com.library.dto.request.RegisterReaderRequest;
import com.library.dto.response.ReaderResponse;
import com.library.exception.AuthenticationException;
import com.library.security.CustomUserDetailsService;
import com.library.security.JwtTokenProvider;
import com.library.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;
    private final ReaderService readerService;

    public UserPrincipal authenticate(LoginDTO request) {
        UserPrincipal user = (UserPrincipal) userDetailsService.loadUserByUsername(request.getUsername());
        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword())
                || request.getPassword().equals(user.getPassword());
        if (!passwordMatches) {
            throw new AuthenticationException("Invalid username or password");
        }
        return user;
    }

    public String login(LoginDTO request) {
        return tokenProvider.generateToken(authenticate(request));
    }

    public String login(UserPrincipal user) {
        return tokenProvider.generateToken(user);
    }

    public ReaderResponse register(RegisterReaderRequest request) {
        return readerService.register(request);
    }
}