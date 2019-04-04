package com.ecp.repo;

import com.ecp.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author 于婉
 * @create 2019-03-13 13:54
 */
public interface NoticeRepo extends JpaRepository<Notice, Long> {

    @Query("select u from Notice u where u.title like ?1 or u.content like ?1")
    Page<Notice> findInKey(String key, Pageable pageable);
}
