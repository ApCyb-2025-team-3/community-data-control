package edu.spbu.datacontrol.groupservice.security;

import edu.spbu.datacontrol.commons.UserEntity;
import edu.spbu.datacontrol.groupservice.security.UserService;
import edu.spbu.datacontrol.groupservice.security.UserSessionService;
import java.util.Collection;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthUserController {

    private final UserService userService;

    private final UserSessionService userSessionService;

    @PostMapping("/changeUserRole")
    public Optional<UserEntity> changeUserRole(@RequestParam String nodeId, @RequestParam String role) {
        userService.changeUserRole(nodeId, role);
        userSessionService.updateUserRoleInSessions(nodeId, role);
        return userService.findByNodeId(nodeId);
    }

    @GetMapping("/getAuthUser")
    public Object getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return  authentication.getPrincipal();
    }

    public static void updateAuthorities(Authentication authentication, Collection<GrantedAuthority> newAuthorities) {
        // Создаем обновленный объект аутентификации с новыми авторитетами
        Authentication updatedAuthentication = new UsernamePasswordAuthenticationToken(
            authentication.getPrincipal(),
            authentication.getCredentials(),
            newAuthorities
        );

        // Устанавливаем обновленный объект аутентификации в контекст безопасности
        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);
    }
}
