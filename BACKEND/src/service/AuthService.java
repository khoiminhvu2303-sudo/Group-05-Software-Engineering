package com.library.service;

import com.library.dto.request.LoginDTO;
import com.library.dto.request.RegisterReaderDTO;
import com.library.dto.response.ReaderResponseDTO;
import com.library.entity.Reader;
import com.library.exception.AuthenticationException;
import com.library.repository.ReaderRepository;
import com.library.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ReaderRepository readerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final ReaderService readerService;

    public String login(LoginDTO request) {
        Reader reader = readerRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AuthenticationException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), reader.getPassword())) {
            throw new AuthenticationException("Invalid username or password");
        }

        return tokenProvider.generateToken(reader.getUsername());
    }

    public ReaderResponseDTO register(RegisterReaderDTO request) {
        return readerService.registerReader(request);
    }
}
