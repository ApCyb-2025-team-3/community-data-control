package edu.spbu.datacontrol.groupservice.models;

import edu.spbu.datacontrol.commons.User;
import jakarta.persistence.*;

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

    @ManyToOne
    private User mentor;

    @OneToOne
    private User mentee;

    //@CreatedDate
    private Date creationDate;

    private Date disbandmentDate;

    public Mentorship() {
    }

    public Mentorship(User mentor, User mentee, Date creationDate, Date disbandmentDate) {
        this.mentor = mentor;
        this.mentee = mentee;
        this.creationDate = creationDate;
        this.disbandmentDate = disbandmentDate;
    }

}


