package com.ecp.repo;

import com.ecp.entity.Upload;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadRepo extends JpaRepository<Upload,Long> {

    @Query("select u from Upload u where u.name like ?1 or u.suffix like ?1 ")
    Page<Upload> findInKey(String key, Pageable pageable);
}
