package edu.spbu.datacontrol.repositories;

import edu.spbu.datacontrol.models.Group;
import edu.spbu.datacontrol.models.enums.GroupType;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GroupRepository extends CrudRepository<Group, UUID> {

}