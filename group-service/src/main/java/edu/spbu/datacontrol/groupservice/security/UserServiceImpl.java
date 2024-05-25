package edu.spbu.datacontrol.groupservice.security;

import edu.spbu.datacontrol.commons.UserEntity;
import edu.spbu.datacontrol.commons.enums.UserRole;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserEntityRepository userEntityRepository;
    @Override
    public Optional<UserEntity> findByNodeId(String nodeId) {
        return userEntityRepository.findByNodeId(nodeId);
    }

    public Optional<UserEntity> getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return (Optional<UserEntity>) authentication.getPrincipal();
        }
        return Optional.empty();
    }
    @Override
    public void save(UserEntity user) {
        userEntityRepository.save(user);
    }

    public void changeUserRole(String nodeId, String newRole) {
        UserEntity user = userEntityRepository.findByNodeId(nodeId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + nodeId));

        // Обновляем роль пользователя
        if (newRole.equals("ROLE_ADMIN"))
            user.setRole(UserRole.ROLE_ADMIN);
        else
            user.setRole(UserRole.ROLE_USER);
        userEntityRepository.save(user);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Создаем новые авторитеты с новой ролью
        List<SimpleGrantedAuthority> updatedAuthorities = List.of(new SimpleGrantedAuthority(newRole));

        // Создаем новый объект аутентификации с новыми авторитетами
        Authentication newAuth = new UsernamePasswordAuthenticationToken(
            authentication.getPrincipal(),
            authentication.getCredentials(),
            updatedAuthorities
        );
        // Обновляем контекст безопасности с новым объектом аутентификации
        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }
}
