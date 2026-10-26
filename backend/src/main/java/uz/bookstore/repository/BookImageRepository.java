package uz.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.bookstore.entity.BookImage;

import java.util.List;

@Repository
public interface BookImageRepository extends JpaRepository<BookImage, Long> {

    List<BookImage> findByBookIdOrderBySortOrderAsc(Long bookId);
}
