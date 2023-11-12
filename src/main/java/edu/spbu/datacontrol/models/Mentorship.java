package edu.spbu.datacontrol.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.UUID;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@Table(name = "mentorships")
public class Mentorship {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @OneToOne
  private User mentor;

  @OneToOne
  private User mentee;

  @CreatedDate
  private Date creationDate;

  private Date disbandmentDate;

  public Mentorship() {
  }

  public Mentorship(User mentor, User mentee, Date disbandmentDate) {
    this.mentor = mentor;
    this.mentee = mentee;
    this.disbandmentDate = disbandmentDate;
  }

}


