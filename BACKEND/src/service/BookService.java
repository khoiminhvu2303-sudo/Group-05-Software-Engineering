package service;

import dto.response.BookResponseDTO;
import java.util.List;

public class BookService {

    public BookResponseDTO getBookById(String bookId) {
        // TODO: Fetch book info combined with Author, Publisher, and Category
        return new BookResponseDTO();
    }

    public List<BookResponseDTO> searchBooks(String title, String categoryId) {
        // TODO: Search books by title and categoryId
        return List.of();
    }
}
