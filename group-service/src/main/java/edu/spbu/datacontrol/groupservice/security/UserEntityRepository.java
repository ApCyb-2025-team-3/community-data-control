package edu.spbu.datacontrol.groupservice.security;

import edu.spbu.datacontrol.commons.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByNodeId(String nodeId);

}
