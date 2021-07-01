package com.kulygin.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        final DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
                .antMatchers("/", "/home", "/portfolio", "/settings", "/materials", "/news", "/students",
                        "/parents", "/feedback", "/folder/*", "/page-not-found", "/metrics", "/health",
                        "/configuration", "/logs")
                .permitAll()
                .antMatchers("/api/user/", "/api/user/login", "/api/user/1")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/api/new/")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/api/folder/**")
                .permitAll()
                .antMatchers("/assets/*.png", "/assets/image/*.*", "/*.js", "/*.css", "/*.html")
                .permitAll()
                .anyRequest()
                .permitAll()
                .and()
                .httpBasic()
                .and().csrf().disable();
    }

}
