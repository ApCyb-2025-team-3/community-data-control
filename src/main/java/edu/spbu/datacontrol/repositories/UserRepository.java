package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.User;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {

    User getUserById(UUID userId);

    User getUserByEmail(String email);

    User getUserByPhoneNumber(String phoneNumber);

    List<User> getUsersByName(String name);

    List<User> findAllByOrderByName();
}
