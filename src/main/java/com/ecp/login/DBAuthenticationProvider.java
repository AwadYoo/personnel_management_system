/**
 * 2016年9月23日-上午9:54:20
 * 2016济中节能-版权所有
 */
package com.ecp.login;

import com.ecp.entity.User;
import com.ecp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author wangcj
 * @version 1.0.0
 * @CreateTime 2016年9月23日 上午9:54:20
 * @Description
 */

@Component("dBAuthenticationProvider")
public class DBAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void additionalAuthenticationChecks(UserDetails user, UsernamePasswordAuthenticationToken token)
            throws AuthenticationException {

    }

    @Override
    protected UserDetails retrieveUser(String userId, UsernamePasswordAuthenticationToken token)
            throws AuthenticationException {
        String password = (String) token.getCredentials();
        Optional<User> userOptional = userRepo.findByLoginId(userId);
        if (!userOptional.isPresent())
            throw new UsernameNotFoundException(userId);
        User user = userOptional.get();
        String userPassword = user.getPassword();
//        String userPassword = "123456";
        if (!passwordEncoder.matches(password, userPassword))
            throw new PasswordNotMatchException(userId);
        boolean enabled = user.isEnabled();
//        if (!enabled) {
//            throw new AccountLockedException("账户已被锁定!请联系管理员");
//        }
        //boolean nonLocked = user.isAccountNonLocked();
        //ZonedDateTime d = user.getAccountExpiredTime();
        //boolean nonExpired = d == null ? true : d.toInstant().toEpochMilli() > System.currentTimeMillis();
        List<SimpleGrantedAuthority> list = new ArrayList<>();
        List<String> rnames = null; //user.getRole();
        if (rnames == null)
            list.add(new SimpleGrantedAuthority("default"));
        else {
            for (String role : rnames) {

                list.add(new SimpleGrantedAuthority(role));
            }
        }
        return new org.springframework.security.core.userdetails.User(user.getLoginId(), userPassword, enabled,
                true, true, true, list);
    }
}
