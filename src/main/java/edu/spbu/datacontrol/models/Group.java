package edu.spbu.datacontrol.models;

import edu.spbu.datacontrol.models.enums.GroupType;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @CreatedDate
    private Date creationDate;

    @CreatedDate
    private Date disbandmentDate;

    private String disbandmentReason;

    private boolean isActive = true;

    private GroupType type;

    private String name;

    private String description;

    @ManyToOne
    private User teamLead;

    @ManyToMany
    private List<User> members;

    public Group(GroupType type, String name, String description, User teamLead) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.teamLead = teamLead;

    }

    public Group() {}


}
