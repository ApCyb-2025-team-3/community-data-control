package edu.spbu.datacontrol.models;

import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.Id;

@Entity
@Data
public class Event {

  @Id
  long id;

}
