package edu.spbu.datacontrol.userservice.security;


import edu.spbu.datacontrol.commons.UserEntity;
import java.util.Optional;

public interface UserService  {

    Optional<UserEntity> findByEmail(String email);

    void save(UserEntity user);
}
