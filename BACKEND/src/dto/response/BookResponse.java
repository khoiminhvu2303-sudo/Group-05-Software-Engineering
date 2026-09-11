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
public class BookResponse {

    private String id;
    private String isbn;
    private String title;
    private String description;
    private Integer publicationYear;
    private String publisher;
    private List<String> authors;
    private List<String> categories;
    private Integer totalCopies;
    private Integer availableCopies;
}
