package com.back4.security.filter;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Log4j2
public class JwtCheckerFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 비밀키 생성
    private final long tokenValidityInMilliseconds = 1000 * 60 * 60; // 1시간

    // JWT 생성
    public String createToken(String email, String name, String roleNames, String adress) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("email", email);
        claims.put("name", name);
        claims.put("roleNames", roleNames); // `memRole` 추가
        claims.put("adress", adress);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + tokenValidityInMilliseconds))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // JWT에서 이메일 추출
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // JWT에서 권한 정보 추출
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Object rolesObject = claims.get("roles");
        if (rolesObject instanceof List) {
            return ((List<?>) rolesObject).stream()
                    .map(Object::toString) // 문자열로 변환
                    .collect(Collectors.toList());
        }
        return List.of(); // 기본 빈 리스트 반환
    }

    // JWT 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // 필터링 로직
    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String path = request.getRequestURI();
//        log.info("Processing request URI: {}", path);
//
//        // 로그인과 회원가입 경로는 필터 제외
//        if ("/api/member/login".equals(path) || "/api/member/signup".equals(path)) {
//            log.info("Skipping authentication for path: {}", path);
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token = resolveToken(request);
//        log.info("Extracted token: {}", token);
//        if (token != null && validateToken(token)) {
//            String email = getEmailFromToken(token);
//            List<String> roles = getRolesFromToken(token);
//
//            // 권한 리스트가 비어 있을 경우 처리
//            if (roles == null || roles.isEmpty()) {
//                log.warn("No roles found in token, defaulting to ROLE_USER");
//                roles = List.of("ROLE_USER"); // 기본 권한 설정
//            }
//
//            List<SimpleGrantedAuthority> authorities = roles.stream()
//                    .map(SimpleGrantedAuthority::new)
//                    .collect(Collectors.toList());
//
//            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
//            if (userDetails == null) {
//                log.error("UserDetails not found for email: {}", email);
//                filterChain.doFilter(request, response);
//                return;
//            }
//
//            log.info("Authenticated email: {}", email);
//            log.info("Roles extracted: {}", roles);
//            log.info("UserDetails: {}", userDetails.getUsername());
//            log.info("Authorities: {}", authorities);
//
//            UsernamePasswordAuthenticationToken authentication =
//                    new UsernamePasswordAuthenticationToken(email, null, authorities);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        } else {
//            log.warn("Token is invalid or null");
//        }
//
//        filterChain.doFilter(request, response);
//    }
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        log.info("Processing request URI: {}", path);
        log.info("Authorization Header: {}", request.getHeader("Authorization"));

        // 로그인과 회원가입 경로는 필터 제외
        if ("/api/member/login".equals(path) || "/api/member/signup".equals(path)) {
            log.info("Skipping authentication for path: {}", path);
            filterChain.doFilter(request, response);
            return;
        }

        String token = resolveToken(request);
        log.info("Extracted token: {}", token);

        if (token != null && validateToken(token)) {
            String email = getEmailFromToken(token);
            String roleNames = getRoleNamesFromToken(token); // memRole 대신 roleNames 사용

            // 권한 설정
            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + roleNames));
            log.info("Assigned role: {}", roleNames);

            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            if (userDetails == null) {
                log.error("UserDetails not found for email: {}", email);
                filterChain.doFilter(request, response);
                return;
            }

            log.info("Authenticated email: {}", email);
            log.info("Authorities: {}", authorities);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("Authentication set for user: {}", email);
        } else {
            log.warn("Token is invalid or null");
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        log.info("Authorization Header: {}", bearerToken); // 헤더 값 출력
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private String getRoleNamesFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        log.info("Decoded token claims: {}", claims);

        Object roleNames = claims.get("roleNames");
        if (roleNames != null) {
            return roleNames.toString();
        }
        // 기본값으로 ROLE_USER 반환
        return "ROLE_USER";
    }
}
