package edu.spbu.datacontrol.userservice.config;

import edu.spbu.datacontrol.commons.UserEntity;
import edu.spbu.datacontrol.commons.enums.RegistrationSource;
import edu.spbu.datacontrol.commons.enums.UserRole;
import edu.spbu.datacontrol.userservice.security.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserService userService;

    @Value("${frontend.url}")
    private String frontendUrl;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws ServletException, IOException {

        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        String source = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId();
        DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = principal.getAttributes();
        String nodeId;
        if (source.equalsIgnoreCase(RegistrationSource.GITHUB.name())) {
            nodeId = attributes.getOrDefault("id", "").toString();
        } else {
            nodeId = attributes.getOrDefault("sub", "").toString();
        }
        String name = attributes.getOrDefault("name", "").toString();
        userService.findByNodeId(nodeId)
            .ifPresentOrElse(user -> {
                if (source.equalsIgnoreCase(RegistrationSource.GITHUB.name())) {
                    DefaultOAuth2User newUser = new DefaultOAuth2User(
                        List.of(new SimpleGrantedAuthority(user.getRole().name())),
                        attributes, "id");
                    Authentication securityAuth = new OAuth2AuthenticationToken(newUser,
                        List.of(new SimpleGrantedAuthority(UserRole.ROLE_USER.name())),
                        oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
                    SecurityContextHolder.getContext().setAuthentication(securityAuth);
                } else {
                    DefaultOAuth2User newUser = new DefaultOAuth2User(
                        List.of(new SimpleGrantedAuthority(user.getRole().name())),
                        attributes, "sub");
                    Authentication securityAuth = new OAuth2AuthenticationToken(newUser,
                        List.of(new SimpleGrantedAuthority(UserRole.ROLE_USER.name())),
                        oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
                    SecurityContextHolder.getContext().setAuthentication(securityAuth);
                }

            }, () -> {
                UserEntity userEntity = new UserEntity();
                userEntity.setRole(UserRole.ROLE_USER);
                userEntity.setNodeId(nodeId);
                userEntity.setName(name);
                if (source.equals("github")) {
                    userEntity.setSource(RegistrationSource.GITHUB);
                } else {
                    userEntity.setSource(RegistrationSource.GOOGLE);
                }
                userService.save(userEntity);
                DefaultOAuth2User newUser = new DefaultOAuth2User(
                    List.of(new SimpleGrantedAuthority(userEntity.getRole().name())),
                    attributes, "id");
                Authentication securityAuth = new OAuth2AuthenticationToken(newUser,
                    List.of(new SimpleGrantedAuthority(userEntity.getRole().name())),
                    oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
                SecurityContextHolder.getContext().setAuthentication(securityAuth);
            });

        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontendUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}