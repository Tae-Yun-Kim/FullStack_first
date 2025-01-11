package com.back4.service.community;

import com.back4.domain.community.Community;
import com.back4.domain.community.CommunityImage;
import com.back4.domain.member.Member;
import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.community.CommunityDTO;
import com.back4.repository.community.CommunityRepository;
import com.back4.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;
    private final MemberRepository memberRepository;

    @Override
    public PageResponseDTO<CommunityDTO> getCommunityList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending());

        Page<Object[]> result = communityRepository.selectList(pageable);

        List<CommunityDTO> dtoList = result.get().map(arr -> {
            Community community = (Community) arr[0];
            CommunityImage communityImage = (CommunityImage) arr[1];

            CommunityDTO communityDTO = CommunityDTO.builder()
                    .tno(community.getTno())
                    .communityTitle(community.getCommunityTitle())
                    .communityContent(community.getCommunityContent())
                    .nickname(community.getMember().getNickname())
                    .email(community.getMember().getEmail())
                    .viewCount(community.getViewCount())
                    .likeCount(community.getLikeCount())
                    .category(community.getCategory())
                    .ingredients(community.getIngredients()) // 재료 정보 추가
                    .build();

            if (communityImage != null) {
                communityDTO.setUploadFileNames(List.of(communityImage.getFileName()));
            }

            return communityDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<CommunityDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    @Override
    public List<String> getAllCategories() {
        return Arrays.asList("한식", "중식", "일식", "양식", "기타");
    }

    @Override
    public Long register(CommunityDTO communityDTO) {
        log.info("Registering Community: {}", communityDTO); // DTO 디버깅 로그

        Community community = dtoToEntity(communityDTO);
        Community result = communityRepository.save(community);

        log.info("Saved Community Entity: {}", result); // 저장된 엔티티 로그

        return result.getTno();
    }

    @Override
    public CommunityDTO getCommunity(Long tno, String memberEmail) {
        // 게시글 조회
        Optional<Community> result = communityRepository.selectOne(tno);
        Community community = result.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        // DTO 변환
        CommunityDTO dto = entityToDTO(community);

        // 로그인 안 했을 때 userEmail이 null일 경우를 허용
        // 좋아요 여부 설정 (로그인하지 않은 경우 false)
        boolean isLiked = (memberEmail != null) && community.getLikedUsers().contains(memberEmail);
        log.info("Liked Users: {}", community.getLikedUsers());
        log.info("Member Email: {}", memberEmail);
        dto.setLiked(isLiked);  // 좋아요 여부 설정

        return dto;
    }

    @Override
    public void modify(CommunityDTO communityDTO) {
        Optional<Community> result = communityRepository.findById(communityDTO.getTno());
        Community community = result.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));


        community.changeTitle(communityDTO.getCommunityTitle());
        community.changeCategory(communityDTO.getCategory());
        community.changeIngredients(communityDTO.getIngredients());
        community.changeContent(communityDTO.getCommunityContent());
        community.clearList();

        List<String> uploadFileNames = communityDTO.getUploadFileNames();
        if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
            uploadFileNames.forEach(community::addImageString);
        }

        communityRepository.save(community);
    }

    @Override
    public void remove(Long tno) {
        communityRepository.deleteById(tno);
    }

    @Override
    public void increaseViewCount(Long tno) {
        Community entity = communityRepository.findById(tno)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        entity.increaseViewCount();
        communityRepository.save(entity);
    }

    @Override
    public void changeIngredients(Long tno, String ingredients) {
        Community community = communityRepository.findById(tno)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. tno: " + tno));
        community.changeIngredients(ingredients);
        communityRepository.save(community);
    }


    @Override
    public boolean toggleLike(Long tno, String memberEmail) {
        Community community = communityRepository.findById(tno)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        return community.toggleLike(memberEmail);
    }

    private Community dtoToEntity(CommunityDTO communityDTO) {
        Member member = null;
        if (communityDTO.getEmail() != null) {
            member = memberRepository.findByEmail(communityDTO.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        }
        Community community = Community.builder()
                .tno(communityDTO.getTno())
                .communityTitle(communityDTO.getCommunityTitle())
                .communityContent(communityDTO.getCommunityContent())
                .member(member)
                .viewCount(communityDTO.getViewCount())
                .likeCount(communityDTO.getLikeCount())
                .category(communityDTO.getCategory())
                .ingredients(communityDTO.getIngredients())
                .build();
        List<String> uploadFileNames = communityDTO.getUploadFileNames();
        if (uploadFileNames != null) {
            uploadFileNames.forEach(community::addImageString);
        }
        return community;
    }

    private CommunityDTO entityToDTO(Community community) {
        CommunityDTO communityDTO = CommunityDTO.builder()
                .tno(community.getTno())
                .communityTitle(community.getCommunityTitle())
                .nickname(community.getMember().getNickname())
                .email(community.getMember().getEmail())
                .communityContent(community.getCommunityContent())
                .createdAt(community.getCreatedAt())
                .updatedAt(community.getUpdatedAt ())
                .viewCount(community.getViewCount())
                .likeCount(community.getLikeCount())
                .category(community.getCategory())
                .ingredients(community.getIngredients())
                .build();

        List<CommunityImage> imageList = community.getImageList();
        if (imageList != null && !imageList.isEmpty()) {
            List<String> fileNameList = imageList.stream()
                    .map(CommunityImage::getFileName)
                    .collect(Collectors.toList());
            communityDTO.setUploadFileNames(fileNameList);
        }

        return communityDTO;
    }
}
