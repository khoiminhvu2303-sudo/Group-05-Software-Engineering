package com.library.config;

import com.library.constant.ApiPathConstants;
import com.library.constant.RoleConstants;
import com.library.constant.SecurityConstants;
import com.library.security.CustomAccessDeniedHandler;
import com.library.security.JwtAuthenticationEntryPoint;
import com.library.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                          CustomAccessDeniedHandler customAccessDeniedHandler) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.customAccessDeniedHandler = customAccessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOriginPatterns(List.of("*"));
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setExposedHeaders(List.of(SecurityConstants.CORRELATION_ID_HEADER));
        cfg.setAllowCredentials(true);
        cfg.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/api/**", cfg);
        return src;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(ex -> ex
                    .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                    .accessDeniedHandler(customAccessDeniedHandler)
            )
            .authorizeHttpRequests(auth -> auth

                // ===== CORS preflight — luôn permit =====
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ===== PUBLIC =====
                .requestMatchers(SecurityConstants.PUBLIC_ENDPOINTS).permitAll()
                .requestMatchers(HttpMethod.POST, ApiPathConstants.READERS + "/register").permitAll()

                // ===== BOOKS =====
                .requestMatchers(HttpMethod.GET, ApiPathConstants.BOOKS).permitAll()
                .requestMatchers(HttpMethod.GET, ApiPathConstants.BOOKS + "/*").permitAll()
                .requestMatchers(ApiPathConstants.BOOKS + "/**")
                    .hasAnyRole(RoleConstants.STAFF, RoleConstants.ADMIN)

                // ===== CATALOG (Author / Publisher / Category) =====
                .requestMatchers(HttpMethod.GET,
                        ApiPathConstants.AUTHORS + "/**",
                        ApiPathConstants.PUBLISHERS + "/**",
                        ApiPathConstants.CATEGORIES + "/**").permitAll()
                .requestMatchers(ApiPathConstants.AUTHORS + "/**",
                        ApiPathConstants.PUBLISHERS + "/**",
                        ApiPathConstants.CATEGORIES + "/**")
                    .hasAnyRole(RoleConstants.STAFF, RoleConstants.ADMIN)

                // ===== READER + STAFF + ADMIN =====
                .requestMatchers(ApiPathConstants.READERS + "/**",
                        ApiPathConstants.RESERVATIONS + "/**",
                        ApiPathConstants.WISHLIST + "/**")
                    .hasAnyRole(RoleConstants.READER, RoleConstants.STAFF, RoleConstants.ADMIN)

                // ===== STAFF + ADMIN =====
                .requestMatchers(ApiPathConstants.BORROWS + "/**",
                        ApiPathConstants.FINES + "/**",
                        ApiPathConstants.CIRCULATION + "/**",
                        ApiPathConstants.REPORTS + "/**",
                        ApiPathConstants.STATISTICS + "/**")
                    .hasAnyRole(RoleConstants.STAFF, RoleConstants.ADMIN)

                // ===== ADMIN =====
                .requestMatchers(ApiPathConstants.ADMIN + "/**",
                        ApiPathConstants.AUDIT_LOGS + "/**")
                    .hasRole(RoleConstants.ADMIN)

                // Staff xem profile chính mình
                .requestMatchers(HttpMethod.GET, ApiPathConstants.STAFF + "/me")
                    .hasAnyRole(RoleConstants.STAFF, RoleConstants.ADMIN)
                .requestMatchers(ApiPathConstants.STAFF + "/**")
                    .hasRole(RoleConstants.ADMIN)

                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
