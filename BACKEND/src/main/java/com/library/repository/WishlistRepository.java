package com.library.repository;

import com.library.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<WishList, String> {
    List<WishList> findByReader_ReaderId(String readerID);
}
