package edu.spbu.datacontrol.groupservice;


import java.util.UUID;

import edu.spbu.datacontrol.Group;
import edu.spbu.datacontrol.User;
import edu.spbu.datacontrol.enums.GroupType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface GroupRepository extends CrudRepository<Group, UUID> {

    Group getGroupByName(String name);

    Group getGroupById(UUID id);

    List<Group> getGroupsByIsActiveTrue();

    List<Group> getGroupsByTypeAndIsActiveTrue(GroupType type);

    List <Group> getGroupsByMembersContains(User user);

    List<Group> getGroupsByMembersContainsAndType(User user, GroupType type);

    List<Group> findByNameContainingIgnoreCaseAndIsActiveTrue(String partialName);

    List<Group> findByNameContainingIgnoreCaseAndType(String partialName, GroupType groupType);

    List<Group> findAllByOrderByIsActiveDesc();

    List<Group> getGroupsByTypeOrderByIsActiveDesc(GroupType type);


}
