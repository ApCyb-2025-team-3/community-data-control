package edu.spbu.datacontrol;

import static org.junit.jupiter.api.Assertions.assertTrue;

import io.zonky.test.db.AutoConfigureEmbeddedDatabase;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
@AutoConfigureEmbeddedDatabase
class CommunityDataControlApplicationTests {
  @Test
  void contextLoads() {
    assertTrue(true);
  }

}
