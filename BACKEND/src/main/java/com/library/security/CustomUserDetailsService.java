package com.library.security;

import com.library.entity.Admin;
import com.library.entity.Reader;
import com.library.entity.Staff;
import com.library.repository.AdminRepository;
import com.library.repository.ReaderRepository;
import com.library.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final StaffRepository staffRepository;
    private final ReaderRepository readerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> adminOpt = adminRepository.findByNameLoginAdmin(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
           
            return new UserPrincipal(admin.getAdminId(), admin.getNameLoginAdmin(), admin.getPasswordAdmin(), UserRole.ROLE_ADMIN);
        }

        Optional<Staff> staffOpt = staffRepository.findByNameLoginStaff(username);
        if (staffOpt.isPresent()) {
            Staff staff = staffOpt.get();
            if (!"Active".equalsIgnoreCase(staff.getStatus())) {
                throw new UsernameNotFoundException("Tài khoản thủ thư đang bị khóa: " + username);
            }
            
            return new UserPrincipal(staff.getStaffId(), staff.getNameLoginStaff(), staff.getPasswordStaff(), UserRole.ROLE_STAFF);
        }

        Optional<Reader> readerOpt = readerRepository.findByUsername(username);
        if (readerOpt.isPresent()) {
            Reader reader = readerOpt.get();
            if (!"Active".equalsIgnoreCase(reader.getStatus())) {
                throw new UsernameNotFoundException("Tài khoản độc giả đang bị khóa: " + username);
            }
           
            return new UserPrincipal(reader.getReaderId(), reader.getUsername(), reader.getPassword(), UserRole.ROLE_READER);
        }

        throw new UsernameNotFoundException("Không tìm thấy tài khoản với username: " + username);
    }
}