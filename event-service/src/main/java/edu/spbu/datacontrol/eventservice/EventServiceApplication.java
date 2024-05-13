package edu.spbu.datacontrol.eventservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"edu.spbu.datacontrol.eventservice"})
@EntityScan(basePackages = {"edu.spbu.datacontrol.commons", "edu.spbu.datacontrol.eventservice"})
@EnableJpaRepositories(basePackages = {"edu.spbu.datacontrol.eventservice"})
public class EventServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventServiceApplication.class, args);
    }

}
