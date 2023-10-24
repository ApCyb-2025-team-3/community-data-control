package edu.spbu.datacontrol.models;

import jakarta.persistence.OneToMany;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
public class UserRepositoryImpl implements UserRepository {
    @OneToMany
    private List<User> userList;

    public UserRepositoryImpl() {
        userList = new ArrayList<>();
    }

    @Override
    public List<User> getAllUsers() {
        return userList;
    }

    @Override
    public User getUserById(int id) {
        for (User user : userList) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

    @Override
    public void addUser(User user) {
        userList.add(user);
    }

    @Override
    public void updateUser(User user) {
        for (int i = 0; i < userList.size(); i++) {
            if (userList.get(i).getId() == user.getId()) {
                userList.set(i, user);
                return;
            }
        }
    }

    @Override
    public void deleteUser(int id) {
        userList.removeIf(user -> user.getId() == id);
    }
}
