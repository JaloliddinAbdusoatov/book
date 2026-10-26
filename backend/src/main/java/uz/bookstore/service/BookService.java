package uz.bookstore.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.bookstore.dto.*;
import uz.bookstore.entity.Book;
import uz.bookstore.entity.BookImage;
import uz.bookstore.exception.ResourceNotFoundException;
import uz.bookstore.repository.BookRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookResponse> getActiveBooks() {
        return bookRepository.findByIsActiveTrue().stream()
                .map(this::toResponse)
                .toList();
    }

    public BookResponse getActiveBookById(Long id) {
        Book book = bookRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kitob topilmadi: " + id));
        return toResponse(book);
    }

    public BookResponse getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kitob topilmadi: " + id));
        return toResponse(book);
    }

    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public BookResponse updateBook(Long id, UpdateBookRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kitob topilmadi: " + id));

        if (request.title() != null) book.setTitle(request.title());
        if (request.subtitle() != null) book.setSubtitle(request.subtitle());
        if (request.authorName() != null) book.setAuthorName(request.authorName());
        if (request.description() != null) book.setDescription(request.description());
        if (request.shortDescription() != null) book.setShortDescription(request.shortDescription());
        if (request.price() != null) book.setPrice(request.price());
        if (request.stockQuantity() != null) book.setStockQuantity(request.stockQuantity());
        if (request.pages() != null) book.setPages(request.pages());
        if (request.language() != null) book.setLanguage(request.language());
        if (request.publicationYear() != null) book.setPublicationYear(request.publicationYear());
        if (request.isbn() != null) book.setIsbn(request.isbn());
        if (request.publisher() != null) book.setPublisher(request.publisher());
        if (request.coverImageUrl() != null) book.setCoverImageUrl(request.coverImageUrl());
        if (request.authorBio() != null) book.setAuthorBio(request.authorBio());
        if (request.authorImageUrl() != null) book.setAuthorImageUrl(request.authorImageUrl());
        if (request.authorAchievements() != null) book.setAuthorAchievements(request.authorAchievements());
        if (request.tableOfContents() != null) book.setTableOfContents(request.tableOfContents());
        if (request.isActive() != null) book.setIsActive(request.isActive());

        return toResponse(bookRepository.save(book));
    }

    public BookResponse toResponse(Book book) {
        List<BookImageResponse> images = book.getImages().stream()
                .map(img -> new BookImageResponse(
                        img.getId(),
                        img.getImageUrl(),
                        img.getAltText(),
                        img.getSortOrder()
                ))
                .toList();

        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getSubtitle(),
                book.getAuthorName(),
                book.getDescription(),
                book.getShortDescription(),
                book.getPrice(),
                book.getStockQuantity(),
                book.getStockQuantity() > 0,
                book.getPages(),
                book.getLanguage(),
                book.getPublicationYear(),
                book.getIsbn(),
                book.getPublisher(),
                book.getCoverImageUrl(),
                book.getAuthorBio(),
                book.getAuthorImageUrl(),
                book.getAuthorAchievements(),
                book.getTableOfContents(),
                images,
                book.getCreatedAt(),
                book.getUpdatedAt()
        );
    }
}
