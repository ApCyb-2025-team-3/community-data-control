package edu.spbu.datacontrol.userservice.security;


import edu.spbu.datacontrol.commons.UserEntity;
import java.util.Optional;

public interface UserService  {

    void changeUserRole(String email, String newRole);

    Optional<UserEntity> getLoggedInUser();

    Optional<UserEntity> findByEmail(String email);

    void save(UserEntity user);
}
