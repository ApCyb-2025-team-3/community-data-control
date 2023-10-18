package edu.spbu.datacontrol.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jdk.jfr.Enabled;
import lombok.Data;

@Entity
@Data
public class User {

  @Id
  long id;

}
