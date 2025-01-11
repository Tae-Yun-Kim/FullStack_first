package com.back4.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

import javax.crypto.SecretKey;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

@Log4j2
public class JWTUtil {

    // 30자리 이상의 비밀키 설정
    private static final String KEY = "1234567890123456789012345678901234567890";

    /**
     * JWT 토큰 생성 메서드
     * @param valueMap 클레임 정보
     * @param min 만료 시간 (분 단위)
     * @return 생성된 JWT 토큰
     */
    public static String generateToken(Map<String, Object> valueMap, int min) {
        SecretKey secretKey = getSecretKey();

        String jwtStr = Jwts.builder()
                .setHeader(Map.of("typ", "JWT")) // 헤더 설정
                .setClaims(valueMap) // 클레임 정보
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant())) // 발급 시간
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant())) // 만료 시간
                .signWith(secretKey) // 서명
                .compact();

        // 로그 출력
        log.info("Generated JWT Token ({} minutes): {}", min, jwtStr);
        return jwtStr;
    }

    /**
     * JWT 토큰 검증 메서드
     * @param token 검증할 토큰
     * @return 토큰에서 추출한 클레임 정보
     */
    public static Map<String, Object> validateToken(String token) {
        try {
            SecretKey secretKey = getSecretKey();
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (MalformedJwtException e) {
            throw new CustomJWTException("MalFormed");
        } catch (ExpiredJwtException e) {
            throw new CustomJWTException("Expired");
        } catch (InvalidClaimException e) {
            throw new CustomJWTException("Invalid");
        } catch (JwtException e) {
            throw new CustomJWTException("JWTError");
        } catch (Exception e) {
            throw new CustomJWTException("Error");
        }
    }

    /**
     * 비밀 키 생성 메서드
     * @return SecretKey 객체
     */
    private static SecretKey getSecretKey() {
        try {
            return Keys.hmacShaKeyFor(KEY.getBytes("UTF-8"));
        } catch (Exception e) {
            throw new RuntimeException("Error creating secret key: " + e.getMessage());
        }
    }
}
