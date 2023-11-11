package edu.spbu.datacontrol.models;

import lombok.Data;

import java.util.Date;

@Data
public class MentorshipCreationDTO {

    UserDTO mentorDTO;

    UserDTO menteeDTO;

    Date disbadmentDate;

    MentorshipCreationDTO(UserDTO mentorDTO, UserDTO menteeDTO, Date disbadmentDate) {
        this.mentorDTO = mentorDTO;
        this.menteeDTO = menteeDTO;
        this.disbadmentDate = disbadmentDate;
    }
}

