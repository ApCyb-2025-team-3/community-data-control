package edu.spbu.datacontrol;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {

  @GetMapping("/status")
  @ResponseStatus(HttpStatus.OK)
  public String status() {
    return "ok";
  }
}
