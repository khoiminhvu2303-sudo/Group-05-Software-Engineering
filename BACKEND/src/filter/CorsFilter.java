package com.library.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE) 
public class CorsFilter extends OncePerRequestFilter {

    @Value("${app.cors.allowed-origins:http://localhost:3000,http://localhost:5173}")
    private String allowedOrigins;

    @Value("${app.cors.allowed-methods:GET,POST,PUT,DELETE,PATCH,OPTIONS}")
    private String allowedMethods;

    @Value("${app.cors.allowed-headers:Authorization,Content-Type,X-Correlation-ID,X-Requested-With,Accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers}")
    private String allowedHeaders;

    @Value("${app.cors.allow-credentials:true}")
    private boolean allowCredentials;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String origin = request.getHeader("Origin");
        
        
        if (origin != null && isOriginAllowed(origin)) {
            response.setHeader("Access-Control-Allow-Origin", origin);
        } else {
            
            response.setHeader("Access-Control-Allow-Origin", allowedOrigins.split(",")[0].trim());
        }

        response.setHeader("Access-Control-Allow-Methods", allowedMethods);
        response.setHeader("Access-Control-Allow-Headers", allowedHeaders);
        response.setHeader("Access-Control-Allow-Credentials", String.valueOf(allowCredentials));
        response.setHeader("Access-Control-Max-Age", "3600"); 

        
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean isOriginAllowed(String origin) {
        String[] origins = allowedOrigins.split(",");
        for (String allowed : origins) {
            if (allowed.trim().equalsIgnoreCase(origin)) {
                return true;
            }
        }
        return false;
    }
}
