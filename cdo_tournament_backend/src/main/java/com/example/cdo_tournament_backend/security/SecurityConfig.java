package com.example.cdo_tournament_backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.cdo_tournament_backend.model.Permission;
import com.example.cdo_tournament_backend.security.filter.JwtAuthFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private AuthenticationProvider authProvider;

    @Autowired
    private JwtAuthFilter authFilter;

    @Bean
    public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception{

        http
            .csrf( csrfConfig -> csrfConfig.disable())
            .sessionManagement( sessionMangConfig -> sessionMangConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authProvider)
            .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests( authConfig -> {
                authConfig.requestMatchers(HttpMethod.POST, "/auth/auth").permitAll();
                authConfig.requestMatchers(HttpMethod.POST, "/auth/register").permitAll();
                authConfig.requestMatchers("/error").permitAll();

                authConfig.requestMatchers(HttpMethod.GET, "/equipo/equipos").hasAuthority(Permission.READ_ALL_MODELS.name());
                authConfig.requestMatchers(HttpMethod.POST, "/equipo").hasAuthority(Permission.SAVE_ALL_MODELS.name());

                authConfig.anyRequest().denyAll();
            });
        return http.build();
    }
}
