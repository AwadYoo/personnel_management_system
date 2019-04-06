package com.ecp.repo;

import com.ecp.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.stream.DoubleStream;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query(nativeQuery = true, value = "select t.* from tb_user t where t.login_id = ?1 and t.checked = 1")
    Optional<User> findByLoginId(String loginId);

    Optional<User> findByLoginIdAndPassword(String loginId, String password);

    @Modifying
    @Query("update User set lastLoginTime = ?2 where id=?1")
    @Transactional
    void updateLastLoginTime(Long id, LocalDateTime lastLoginTime);

    @Query("select u from User u where loginId like ?1 or userName like ?1 or email like ?1")
    Page<User> findInKey(String key, Pageable pageable);

    @Modifying
    @Query("update User set enabled = ?2 where id=?1")
    @Transactional
    void updateState(Long id, boolean state);

    @Modifying
    @Query("update User set password=?1 where id=?2")
    @Transactional
    void updatePassword(String newPassword, Long id);

    @Query("select t from User t where t.checked = 0 ")
    Page<User> findAllReviews(Pageable pageable);

    @Query("select u from User u where checked = 0 and loginId like ?1 or userName like ?1 or email like ?1")
    Page<User> findInKeyReviews(String key, Pageable pageable);
}
