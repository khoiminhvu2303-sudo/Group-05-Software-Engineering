package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BorrowRecordResponseDTO {

    private String transactionId;
    private String readerId;
    private String readerName;
    private String staffId;
    private String staffName;
    private LocalDate dateBorrow;
    private LocalDate dueDate;
    private List<BorrowDetailDTO> borrowDetails;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BorrowDetailDTO {
        private String borrowDetailId;
        private String bookCopyId;
        private String bookTitle;
        private String bookStatus;
        private LocalDate dateIssued;
        private LocalDate actualReturnDate;
    }
}
