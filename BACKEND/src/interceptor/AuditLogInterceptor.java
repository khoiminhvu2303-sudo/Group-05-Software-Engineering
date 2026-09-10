package com.library.interceptor;

import com.library.constant.SecurityConstants;
import com.library.entity.Auditlog;
import com.library.repository.AuditLogRepository;
import com.library.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Ghi audit log vào DB khi controller method có @Auditable.
 * - Chạy sau authentication → có SecurityContext.
 * - Không chặn request nếu ghi log lỗi (try/catch).
 */
@Component
public class AuditLogInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(AuditLogInterceptor.class);

    private final AuditLogRepository auditLogRepository;

    public AuditLogInterceptor(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {
        if (!(handler instanceof HandlerMethod handlerMethod)) return;

        Auditable auditable = handlerMethod.getMethodAnnotation(Auditable.class);
        if (auditable == null) return;

        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String userId = "ANONYMOUS";
            String role   = "GUEST";

            if (auth != null && auth.getPrincipal() instanceof UserPrincipal p) {
                userId = p.getId();
                role = p.getAuthorities().stream()
                        .findFirst()
                        .map(g -> g.getAuthority().replace(SecurityConstants.ROLE_PREFIX, ""))
                        .orElse("GUEST");
            }

            Auditlog entry = new Auditlog();
            entry.setLogID("LOG" + UUID.randomUUID().toString().substring(0, 7).toUpperCase());
            entry.setUserID(userId);
            entry.setUserRole(role);
            entry.setAction(auditable.action());
            entry.setTableName(auditable.table());
            entry.setDescription(buildDescription(request, auditable, response, ex));
            entry.setCreatedAt(LocalDateTime.now());

            auditLogRepository.save(entry);
        } catch (Exception e) {
            log.error("Ghi audit log thất bại cho {} {}: {}",
                    request.getMethod(), request.getRequestURI(), e.getMessage());
        }
    }

    private String buildDescription(HttpServletRequest request, Auditable auditable,
                                    HttpServletResponse response, Exception ex) {
        StringBuilder sb = new StringBuilder();
        sb.append(auditable.description().isEmpty()
                ? auditable.action()
                : auditable.description());
        sb.append(" | ").append(request.getMethod()).append(" ").append(request.getRequestURI());
        sb.append(" | status=").append(response.getStatus());
        if (ex != null) {
            sb.append(" | error=").append(ex.getMessage());
        }
        return sb.toString();
    }
}
