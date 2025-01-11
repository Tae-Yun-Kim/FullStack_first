package com.back4.service.mealkit;

import com.back4.domain.mealkit.Mealkit;
import com.back4.domain.mealkit.MealkitComment;
import com.back4.domain.member.Member;
import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.mealkit.MealkitCommentDTO;
import com.back4.repository.mealkit.MealkitCommentRepository;
import com.back4.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class MealkitCommentServiceImpl implements MealkitCommentService {

    private final MealkitCommentRepository mealkitCommentRepository;
    private final ModelMapper modelMapper;
    private final MemberRepository memberRepository;

    @Override
    public PageResponseDTO<MealkitCommentDTO> getMealkitCommentList(PageRequestDTO pageRequestDTO) {
        log.info("getMealkitCommentList..............");

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() <= 0 ? 0 : pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(), Sort.by("mcno").descending());

        Page<MealkitComment> result = mealkitCommentRepository.getMealkitCommentList(pageRequestDTO.getMid(), pageable);

        List<MealkitCommentDTO> dtoList = result.getContent().stream().map(this::entityToDto).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<MealkitCommentDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    @Override
    public Long regMealkitComment(MealkitCommentDTO mealkitCommentDTO) {
        Member member = memberRepository.findByEmail(mealkitCommentDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        MealkitComment mealkitComment = MealkitComment.builder()
                .mealkit(Mealkit.builder().mid(mealkitCommentDTO.getMid()).build())
                .member(member)
                .content(mealkitCommentDTO.getContent())
                .rating(mealkitCommentDTO.getRating())
                .build();

        MealkitComment result = mealkitCommentRepository.save(mealkitComment);

        return result.getMcno();
    }

    @Override
    public MealkitCommentDTO getMealkitComment(Long mcno) {
        Optional<MealkitComment> mealkitCommentOptional = mealkitCommentRepository.findById(mcno);
        MealkitComment mealkitComment = mealkitCommentOptional.orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));
        return entityToDto(mealkitComment);
    }

    @Override
    public void modify(MealkitCommentDTO mealkitCommentDTO) {
        Optional<MealkitComment> mealkitCommentOptional = mealkitCommentRepository.findById(mealkitCommentDTO.getMcno());
        MealkitComment mealkitComment = mealkitCommentOptional.orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));

        String loggedInEmail = mealkitCommentDTO.getEmail();

        if (!mealkitComment.getMember().getEmail().equals(loggedInEmail)) {
            throw new IllegalArgumentException("작성자만 댓글을 수정할 수 있습니다.");
        }

        mealkitComment.setContent(mealkitCommentDTO.getContent());
        mealkitComment.setRating(mealkitCommentDTO.getRating());
        mealkitCommentRepository.save(mealkitComment);
    }

    @Override
    public void remove(Long mcno, String email) {
        Optional<MealkitComment> mealkitCommentOptional = mealkitCommentRepository.findById(mcno);
        MealkitComment mealkitComment = mealkitCommentOptional.orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));

        if (!mealkitComment.getMember().getEmail().equals(email)) {
            throw new IllegalArgumentException("작성자만 댓글을 삭제할 수 있습니다.");
        }

        mealkitCommentRepository.deleteById(mcno);
    }

    private MealkitCommentDTO entityToDto(MealkitComment entity) {
        return MealkitCommentDTO.builder()
                .mcno(entity.getMcno())
                .mid(entity.getMealkit().getMid())
                .content(entity.getContent())
                .nickname(entity.getNickname())
                .email(entity.getMember().getEmail())
                .modified(entity.isModified())
                .rating(entity.getRating())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}