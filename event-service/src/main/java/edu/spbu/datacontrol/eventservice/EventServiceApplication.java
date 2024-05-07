package edu.spbu.datacontrol.eventservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(scanBasePackages = {"edu.spbu.datacontrol.eventservice"})
@EntityScan(basePackages = {"edu.spbu.datacontrol.commons", "edu.spbu.datacontrol.eventservice"})
@EnableJpaAuditing
public class EventServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventServiceApplication.class, args);
    }
}
