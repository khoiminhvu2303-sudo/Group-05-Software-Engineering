package service;

import dto.request.CreateAuditLogDTO;
import dto.request.CreateBorrowDTO;
import dto.response.BorrowResponseDTO;
import java.time.LocalDate;

public class BorrowService {

    private final AuditLogService auditLogService = new AuditLogService();

    public BorrowResponseDTO createBorrowRecord(CreateBorrowDTO request) {
        // TODO: Create new record in BorrowRecord and BorrowDetail tables
        BorrowResponseDTO response = new BorrowResponseDTO();
        response.setTransactionId("TR00000001");
        response.setReaderId(request.getReaderId());
        response.setStaffId(request.getStaffId());
        response.setDateBorrow(LocalDate.now());
        response.setDueDate(request.getDueDate());

        auditLogService.log(new CreateAuditLogDTO(
            request.getStaffId(),
            "STAFF",
            "CREATE_BORROW",
            "BorrowRecord",
            "Created transaction TR00000001 for reader " + request.getReaderId()
        ));

        return response;
    }
}
