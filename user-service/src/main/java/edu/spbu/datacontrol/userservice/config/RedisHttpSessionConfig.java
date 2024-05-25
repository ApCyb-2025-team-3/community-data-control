package edu.spbu.datacontrol.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;

@Configuration
@EnableRedisHttpSession
public class RedisHttpSessionConfig {

  @Bean
  public HeaderHttpSessionIdResolver httpSessionStrategy() {
    return HeaderHttpSessionIdResolver.xAuthToken();
  }
}

