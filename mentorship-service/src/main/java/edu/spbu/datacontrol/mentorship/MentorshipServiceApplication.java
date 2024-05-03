package edu.spbu.datacontrol.mentorship;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaRepositories("edu.spbu.datacontrol")
@ComponentScan("edu.spbu.datacontrol")
public class MentorshipServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MentorshipServiceApplication.class, args);
    }
}
