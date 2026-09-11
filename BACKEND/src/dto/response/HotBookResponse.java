package com.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotBookResponse {

    private String bookId;
    private String title;
    private String isbn;
    private List<String> authors;
    private long borrowCount;
}
