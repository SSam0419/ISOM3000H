import React from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export const SearchProfilePage = () => {
  return (
    <div className="w-full py-6 px-20">
      <SearchBar />
      <SearchResult />
    </div>
  );
};
