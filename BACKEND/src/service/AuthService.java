package service;

import dto.request.CreateAuditLogDTO;
import dto.request.LoginDTO;

public class AuthService {

    private final AuditLogService auditLogService = new AuditLogService();

    public String login(LoginDTO loginDTO) {
        // TODO: Authenticate user credentials
        String userId = "RD00000001";

        auditLogService.log(new CreateAuditLogDTO(
            userId,
            "READER",
            "LOGIN",
            "Reader",
            "User " + loginDTO.getUsername() + " logged in successfully"
        ));

        return "JWT_TOKEN_EXAMPLE";
    }

    public boolean changePassword(String userId, String oldPass, String newPass) {
        // TODO: Update user password
        return true;
    }
}
