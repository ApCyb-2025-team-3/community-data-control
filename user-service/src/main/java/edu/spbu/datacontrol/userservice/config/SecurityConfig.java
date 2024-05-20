package edu.spbu.datacontrol.userservice.config;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/login", "/api/event/**", "/api/auth/getAuthUser", "/api/auth/changeUserRole", "/css/**", "/images/**").permitAll()
                    .requestMatchers(HttpMethod.POST).authenticated()
                    .requestMatchers("/api/user/").authenticated()
                    .anyRequest().authenticated()

            )
            .oauth2Login(oauth2 -> {
                    oauth2.loginPage("/login").permitAll();
                    oauth2.successHandler(oAuth2LoginSuccessHandler);
                }
            )
            .logout(logout ->
                logout
                    .logoutUrl("/logout") // Указываем URL для выхода
                    .logoutSuccessUrl(
                        frontendUrl) // Указываем URL, на который будет перенаправлен пользователь после успешного выхода
                    .invalidateHttpSession(
                        true) // Нужно ли недействительно завершить HTTP-сеанс (по умолчанию true)
                    .deleteCookies("JSESSIONID"))
            .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(
            List.of(frontendUrl, "http://localhost"));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", configuration);
        return urlBasedCorsConfigurationSource;
    }

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**", "/images/**")
            .addResourceLocations("classpath:/static/css/", "classpath:/static/images/");
    }
}