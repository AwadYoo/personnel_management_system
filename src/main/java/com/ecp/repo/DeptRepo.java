package com.ecp.repo;

import com.ecp.entity.Dept;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author 于婉
 * @create 2019-02-27 11:18
 */
@Repository
public interface DeptRepo extends JpaRepository<Dept, Long> {

    @Query("select u from Dept u where u.code like ?1 or u.name like ?1 or u.leader like ?1")
    Page<Dept> findInKey(String key, Pageable pageable);

}
