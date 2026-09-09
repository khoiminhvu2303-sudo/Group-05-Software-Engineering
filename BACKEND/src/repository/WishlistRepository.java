package com.library.repository;

import com.library.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<WishList, String> {
    List<WishList> findByReader_ReaderID(String readerID);
}
