package com.back4.service.community;

import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.community.CommunityDTO;

import java.util.List;

public interface CommunityService {

    Long register(CommunityDTO communityDTO);

    CommunityDTO getCommunity(Long tno, String memberEmail);

    void modify(CommunityDTO communityDTO);

    void remove(Long tno);

    List<String> getAllCategories();

    PageResponseDTO<CommunityDTO> getCommunityList(PageRequestDTO pageRequestDTO);

    void increaseViewCount(Long tno);

    boolean toggleLike(Long tno, String memberEmail);

    void changeIngredients(Long tno, String ingredients);  // ingredients 수정 메서드

}