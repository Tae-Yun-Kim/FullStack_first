package com.back4.service.community;

import com.back4.domain.community.Community;
import com.back4.domain.community.CommunityComment;
import com.back4.domain.member.Member;
import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.community.CommunityCommentDTO;
import com.back4.repository.community.CommunityCommentRepository;
import com.back4.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class CommunityCommentServiceImpl implements CommunityCommentService {

    private final CommunityCommentRepository communityCommentRepository;
    private final ModelMapper modelMapper;
    private final MemberRepository memberRepository;

    @Override
    public PageResponseDTO<CommunityCommentDTO> getCommunityCommentList(PageRequestDTO pageRequestDTO) {
        log.info("getCommunityCommentList..............");

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() <= 0 ? 0 : pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(), Sort.by("cno").descending());

        Page<CommunityComment> result = communityCommentRepository.getCommunityCommentList(pageRequestDTO.getTno(), pageable);

        List<CommunityCommentDTO> dtoList = result.get().map(comment -> {
            CommunityCommentDTO communityCommentDTO = CommunityCommentDTO.builder()
                    .cno(comment.getCno())
                    .tno(comment.getCommunity().getTno())
                    .communityCommentContent(comment.getCommunityCommentContent())
                    .nickname(comment.getMember().getNickname())
                    .email(comment.getMember().getEmail())  // 이메일 정보 추가
                    .modified(comment.isModified())
                    .createdAt(comment.getCreatedAt())
                    .updatedAt(comment.getUpdatedAt())
                    .build();

            return communityCommentDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<CommunityCommentDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    @Override
    public Long regCommunityComment(CommunityCommentDTO communityCommentDTO) {

        Member member = memberRepository.findByEmail(communityCommentDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        // CommunityComment 엔티티로 변환
        CommunityComment communityComment = CommunityComment.builder()
                .community(Community.builder().tno(communityCommentDTO.getTno()).build())
                .member(member)
                .communityCommentContent(communityCommentDTO.getCommunityCommentContent())
                .build();

        // 댓글 등록 후 댓글 번호 반환
        CommunityComment result = communityCommentRepository.save(communityComment);

        return result.getCno();  // 댓글 번호 반환
    }

    @Override
    public CommunityCommentDTO getCommunityComment(Long cno) {
        Optional<CommunityComment> communityCommentOptional = communityCommentRepository.findById(cno);
        CommunityComment communityComment = communityCommentOptional.orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));
        return modelMapper.map(communityComment, CommunityCommentDTO.class);
    }


    @Override
    public void modify(CommunityCommentDTO communityCommentDTO) {
        Optional<CommunityComment> communityCommentOptional = communityCommentRepository.findById(communityCommentDTO.getCno());
        CommunityComment communityComment = communityCommentOptional.orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));

        String loggedInEmail = communityCommentDTO.getEmail(); // 클라이언트에서 전송한 이메일 사용

        if (!communityComment.getMember().getEmail().equals(loggedInEmail)) {
            throw new IllegalArgumentException("작성자만 댓글을 수정할 수 있습니다.");
        }

        communityComment.setCommunityCommentContent(communityCommentDTO.getCommunityCommentContent());
        communityCommentRepository.save(communityComment);
    }


    @Override
    public void remove(Long cno, String email) {
        Optional<CommunityComment> communityCommentOptional = communityCommentRepository.findById(cno);
        CommunityComment communityComment = communityCommentOptional.orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));

        // 클라이언트에서 전송받은 이메일로 작성자 확인
        if (!communityComment.getMember().getEmail().equals(email)) {
            throw new IllegalArgumentException("작성자만 댓글을 삭제할 수 있습니다.");
        }

        communityCommentRepository.deleteById(cno);
    }
}