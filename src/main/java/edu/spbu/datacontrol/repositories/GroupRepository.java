package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.enums.GroupType;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import edu.spbu.datacontrol.models.User;

@Repository
public interface GroupRepository extends CrudRepository<Group, UUID> {

    Group getGroupByName(String name);

    List<Group> getGroupsByIsActiveTrue();

    List<Group> getGroupsByTypeAndIsActiveTrue(GroupType type);

    List <Group> getGroupsByMembersContains(User user);

    List<Group> getGroupsByMembersContainsAndType(User user, GroupType type);

    List<Group> findByNameContainingIgnoreCaseAndIsActiveTrue(String partialName);

    List<Group> findByNameContainingIgnoreCaseAndType(String partialName, GroupType groupType);

    List<Group> findAllByOrderByIsActiveDesc();

    List<Group> getGroupsByTypeOrderByIsActiveDesc(GroupType type);


}
