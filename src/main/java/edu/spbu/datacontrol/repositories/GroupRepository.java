package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Group;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface GroupRepository extends CrudRepository<Group, UUID> {

    Group getGroupsById(UUID groupId);

    Group getGroupByName(String name);

    List<Group> getGroupsByIsActiveTrue();

}
