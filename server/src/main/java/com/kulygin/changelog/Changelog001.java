package com.kulygin.changelog;

import com.github.cloudyrock.mongock.ChangeLog;
import com.github.cloudyrock.mongock.ChangeSet;
import com.kulygin.domain.User;
import com.kulygin.repository.UserRepository;
import lombok.val;
import org.springframework.security.crypto.password.PasswordEncoder;

@ChangeLog(order = "001")
public class Changelog001 {

    @ChangeSet(order = "001", id = "2021-01-06--001-insert-user--vkulygin", author = "viktor.kulygin")
    public void insertUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        val user = User.builder()
                .id("1")
                .username("olga.kulygina")
                .password(passwordEncoder.encode("123"))
                .firstName("Ольга")
                .lastName("Кулыгина")
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .role("ROLE_USER")
                .build();

        userRepository.save(user);
    }

}
