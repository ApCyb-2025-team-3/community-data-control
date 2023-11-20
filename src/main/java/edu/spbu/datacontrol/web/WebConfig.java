package edu.spbu.datacontrol.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**") // Указание URL, на который будет действовать CORS
        .allowedOrigins("http://localhost:3000") // Разрешенные источники
        .allowedMethods("GET", "POST", "PUT", "DELETE") // Разрешенные методы
        .allowedHeaders("*") // Разрешенные заголовки
        .allowCredentials(true); // Разрешение куки в запросах (если используются)
  }
}
