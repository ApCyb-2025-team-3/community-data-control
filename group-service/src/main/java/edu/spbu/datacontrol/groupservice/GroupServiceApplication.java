package edu.spbu.datacontrol.groupservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = {"edu.spbu.datacontrol.groupservice"})
@EntityScan(basePackages = {"edu.spbu.datacontrol.commons", "edu.spbu.datacontrol.groupservice"})
public class GroupServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GroupServiceApplication.class, args);
    }
}
