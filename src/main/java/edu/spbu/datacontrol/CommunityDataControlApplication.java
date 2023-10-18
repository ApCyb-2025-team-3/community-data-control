package edu.spbu.datacontrol;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages = {"edu.spbu.datacontrol"})
public class CommunityDataControlApplication {

  public static void main(String[] args) {
    SpringApplication.run(CommunityDataControlApplication.class, args);
  }

}
