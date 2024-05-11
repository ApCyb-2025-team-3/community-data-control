package edu.spbu.datacontrol.groupservice.models;

import java.util.Date;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class MentorshipDTO {

    @NotNull
    private UUID id;

    private String mentorName;

    private String menteeName;

    private Date creationDate;

    private Date disbandmentDate;

    public MentorshipDTO(Mentorship mentorship) {
        this.id = mentorship.getId();
        this.mentorName = mentorship.getMentor().getName();
        this.menteeName = mentorship.getMentee().getName();
        this.creationDate = mentorship.getCreationDate();
        this.disbandmentDate = mentorship.getDisbandmentDate();
    }
}
