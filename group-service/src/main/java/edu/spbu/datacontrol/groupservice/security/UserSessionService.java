package edu.spbu.datacontrol.groupservice.security;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UserSessionService {

    @Autowired
    private SessionRegistry sessionRegistry;

    public void updateUserRoleInSessions(String email, String newRole) {
        List<Object> allPrincipals = sessionRegistry.getAllPrincipals();

        for (Object principal : allPrincipals) {
            if (principal instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) principal;
                if (userDetails.getUsername().equals(email)) {
                    updateUserRoleInSession(userDetails, newRole);
                }
            }
        }
    }

    private void updateUserRoleInSession(UserDetails userDetails, String newRole) {
        // Создаем новые авторитеты с новой ролью
        List<SimpleGrantedAuthority> updatedAuthorities = List.of(new SimpleGrantedAuthority(newRole));

        // Создаем новый объект аутентификации с новыми авторитетами
        Authentication newAuth = new UsernamePasswordAuthenticationToken(
            userDetails,
            userDetails.getPassword(),
            updatedAuthorities
        );

        // Обновляем контекст безопасности с новым объектом аутентификации
        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }
}