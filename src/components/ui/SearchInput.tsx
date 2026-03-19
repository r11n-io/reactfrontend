import { TextInput } from "flowbite-react";
import type React from "react";
import { useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * 검색 입력 컴포넌트
 *
 * @returns 검색 입력 폼 JSX
 */
const SearchInput: React.FC = () => {
  const [searchParam] = useSearchParams();
  const initialKeyword = searchParam.get("keyword") || "";
  const [inputValue, setInputValue] = useState<string>(initialKeyword);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const keyword = inputValue.trim();
    const newSearchParams = new URLSearchParams();

    if (keyword) {
      newSearchParams.set("keyword", keyword);
    }

    navigate(`/posts?${newSearchParams.toString()}`);
    setInputValue("");

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="group relative">
        <TextInput
          id="search"
          type="text"
          placeholder="검색.."
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
          theme={{
            field: {
              input: {
                base: "!border-secondary-text/20 !bg-surface !text-primary-text block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                colors: {
                  gray: "focus:!border-accent focus:!ring-accent/30",
                },
              },
            },
          }}
          className="transition-all duration-300"
          rightIcon={() => (
            <HiSearch className="text-secondary-text group-focus-within:text-accent h-5 w-5 transition-colors" />
          )}
        />
      </div>
    </form>
  );
};

export default SearchInput;
