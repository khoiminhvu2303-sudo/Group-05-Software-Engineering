package com.library.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.library.entity.Reader;

import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails {
    private final String id;
    private final String username;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public static UserPrincipal create(Reader reader) {
    return new UserPrincipal(
        reader.getReaderId(),      
        reader.getUsername(),
        reader.getPassword(),
        UserRole.ROLE_READER            
    );
}
    public UserPrincipal(String id, String username, String password, UserRole role) {
        
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = List.of(new SimpleGrantedAuthority(role.name()));
    }

    public String getId() { return id; }
    @Override public String getUsername() { return username; }
    @Override public String getPassword() { return password; }
    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
