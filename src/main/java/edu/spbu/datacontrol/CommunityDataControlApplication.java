package edu.spbu.datacontrol;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CommunityDataControlApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommunityDataControlApplication.class, args);
    }

}
