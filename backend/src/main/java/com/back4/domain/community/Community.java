package com.back4.domain.community;

import com.back4.domain.BaseEntity;
import com.back4.domain.member.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "mealkit_community")
@Getter
@ToString(exclude = {"imageList", "likedUsers"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Community extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tno;

    @Column(nullable = false)
    private String communityTitle;

    @Column(nullable = false)
    private String communityContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Member member;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private int viewCount = 0;  // 조회수 필드 추가

    @Column(nullable = false)
    @Builder.Default
    private int likeCount = 0;

    @ElementCollection
    @CollectionTable(name = "community_liked_users", joinColumns = @JoinColumn(name = "community_id"))
    @Column(name = "user_email")
    @Builder.Default
    private Set<String> likedUsers = new HashSet<>();

    @ElementCollection
    @Builder.Default
    private List<CommunityImage> imageList = new ArrayList<>();  // 이미지 목록

    @Column(nullable = true)
    private String ingredients;  // 재료 필드 추가

//    @Column(nullable = false)
    private LocalDate registerDate; // 등록 날짜 필드 추가

    @PrePersist
    public void prePersist() {
        if (this.registerDate == null) {
            this.registerDate = LocalDate.now();
        }
    }

    public void changeTitle(String communityTitle) {
        this.communityTitle = communityTitle;
    }

    public void changeContent(String communityContent) {
        this.communityContent = communityContent;
    }

    public void addImage(CommunityImage image) {
        image.setOrd(this.imageList.size());
        this.imageList.add(image);
    }

    public void addImageString(String fileName) {
        CommunityImage communityImage = CommunityImage.builder()
                .fileName(fileName)
                .build();
        addImage(communityImage);
    }

    public void changeCategory(String category) {
        this.category = category;
    }

    // ingredients 변경 메서드
    public void changeIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public void clearList() {
        this.imageList.clear();
    }

    // 조회수 증가 메서드
    public void increaseViewCount() {
        this.viewCount++;
    }

    // 추천수 증가 메서드
    public boolean toggleLike(String userEmail) {
        if (likedUsers.contains(userEmail)) {
            likedUsers.remove(userEmail);
            this.likeCount--;
            return false;
        } else {
            likedUsers.add(userEmail);
            this.likeCount++;
            return true;
        }
    }


    public String getNickname() {
        return member.getNickname();
    }


}
