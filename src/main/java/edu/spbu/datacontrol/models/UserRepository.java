package edu.spbu.datacontrol.models;

import java.util.List;

public interface UserRepository {
    List<User> getAllUsers();
    User getUserById(int id);
    void addUser(User user);
    void updateUser(User user);
    void deleteUser(int id);
}
