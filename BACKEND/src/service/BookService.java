package com.library.service;

import com.library.dto.response.BookResponseDTO;
import com.library.entity.Book;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    @Transactional(readOnly = true)
    public BookResponseDTO getBookById(String bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + bookId));
        return mapToResponse(book);
    }

    @Transactional(readOnly = true)
    public List<BookResponseDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private BookResponseDTO mapToResponse(Book book) {
        return BookResponseDTO.builder()
                .bookId(book.getBookID())
                .title(book.getTitle())
                .describe(book.getDescribe())
                .publication(book.getPublication())
                .stockQuantity(book.getStockquantity())
                .status(book.getStatus())
                .authorName(book.getAuthor() != null ? book.getAuthor().getAuthorName() : null)
                .publisherName(book.getPublisher() != null ? book.getPublisher().getName() : null)
                .categoryName(book.getCategory() != null ? book.getCategory().getCategoryName() : null)
                .build();
    }
}
