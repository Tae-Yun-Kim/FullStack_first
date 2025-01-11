// SearchBar

// SearchBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 사용
import { FaSearch } from "react-icons/fa"; // 아이콘 추가

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // useNavigate 사용

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // 검색어를 쿼리 파라미터로 전달
    }
  };

  return (
    <div className="flex-grow max-w-2xl mx-auto">
      <form className="relative w-full" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full border border-gray-500 rounded-full py-3 px-5 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
