package edu.spbu.datacontrol.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.util.Date;
import lombok.Data;
import jakarta.persistence.Id;

@Entity
@Data
public class Event {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  long id;

  Date createdAt;

}
