import { useState } from "react";

const useSearchPagination = () => {
    const [searchData, setSearchData] = useState('');
    const [offset, setOffset] = useState(0);

    const handleSearch = (text: string) => {
        setSearchData(text);
    }

    const handleNewOffset = (newOffset: number) => {
        setOffset(newOffset);
    }

    return {
        searchData,
        offset,
        handleSearch,
        handleNewOffset
    };
};

export default useSearchPagination;
