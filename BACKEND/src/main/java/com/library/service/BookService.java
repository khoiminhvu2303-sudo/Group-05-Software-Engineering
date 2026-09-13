package com.library.service;

import com.library.dto.request.CreateBookRequest;
import com.library.dto.request.UpdateBookRequest;
import com.library.dto.response.BookCopyResponse;
import com.library.dto.response.BookResponse;
import com.library.dto.response.CategoryResponse;
import com.library.entity.Book;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    @Transactional(readOnly = true)
    public Page<BookResponse> searchBooks(String keyword, String author, String category, Integer year, Pageable pageable) {
        // Tạm thời trả về danh sách phân trang (sẽ cấu hình thêm với Repository sau)
        List<BookResponse> books = getAllBooks();
        return new PageImpl<>(books, pageable, books.size());
    }

    @Transactional(readOnly = true)
    public BookResponse getBookById(String bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + bookId));
        return mapToResponse(book);
    }

    @Transactional
    public BookResponse createBook(CreateBookRequest request) {
        // Xử lý tạo mới sách
        return new BookResponse();
    }

    @Transactional
    public BookResponse updateBook(String id, UpdateBookRequest request) {
        // Xử lý cập nhật thông tin sách
        return new BookResponse();
    }

    @Transactional
    public void deleteBook(String id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + id));
        bookRepository.delete(book);
    }

    @Transactional(readOnly = true)
    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategories() {
        return Collections.emptyList();
    }

    @Transactional(readOnly = true)
    public List<BookCopyResponse> getBookCopies(String id) {
        return Collections.emptyList();
    }

    private BookResponse mapToResponse(Book book) {
        return BookResponse.builder()
                .bookId(book.getBookId())
                .title(book.getTitle())
                .description(book.getDescribe())
                .publication(book.getPublication())
                .stockQuantity(book.getStockquantity())
                .status(book.getStatus())
                .authorName(book.getAuthor() != null ? book.getAuthor().getAuthorName() : null)
                .publisherName(book.getPublisher() != null ? book.getPublisher().getName() : null)
                .categoryName(book.getCategory() != null ? book.getCategory().getCategoryName() : null)
                .build();
    }
}