package edu.spbu.datacontrol.commons;

import edu.spbu.datacontrol.commons.enums.RegistrationSource;
import edu.spbu.datacontrol.commons.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@Table(name = "users_entity")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    private String email;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "source")
    @Enumerated(EnumType.STRING)
    private RegistrationSource source;

    public UserEntity(){}

    public UserEntity(String email, String name, String role, String source) {
        this.name = name;
        this.email = email;
        this.role = role.equals("ROLE_ADMIN") ? UserRole.ROLE_ADMIN : UserRole.ROLE_USER;
        this.source = source.equals("GITHUB") ? RegistrationSource.GITHUB : RegistrationSource.GITHUB;
    }
}

