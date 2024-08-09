import React, { useEffect, useState, useRef, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import useWindowWidthUnder from '../../../hooks/useWindowWidthUnder';
import useFetchTokens from '../../../hooks/token/useFetchTokens'; // Adjust the path as needed
import { GeneralContext } from '../../../../contexts/general/General.Context';
import Link from 'next/link';
import TokenLogoAndName from '../../tokens/TokenLogoAndName';
import { useRouter } from 'next/router';

const Search = () => {
  const { getTokenName } = useContext(GeneralContext);
  const isWindowUnder640 = useWindowWidthUnder(640);
  const [searchWrapVisible, setSearchWrapVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const router = useRouter();

  const { data: tokens, loaded, error } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`);

  const handleClick = () => {
    setSearchWrapVisible(prevVisible => !prevVisible);
  };

  useEffect(() => {
    if (searchWrapVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchWrapVisible]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFocusedIndex(0); // Reset focus index when query changes
    if (tokens && loaded) {
      performSearch(query);
    }
  };

  const clearSearchAndClose = (forceClose = false) => {
    if (forceClose || !dropdownRef.current?.contains(document.activeElement)) {
      setSearchQuery('');           // Clear the search query
      setSearchResults([]);         // Clear the search results
      setSearchWrapVisible(false);  // Close the search dropdown
    }
  };

  const handleResultClick = (canister_id) => {
    clearSearchAndClose(true);
    // Optional: Navigate to the selected result
    if (canister_id) {
      router.push(`/token/${canister_id}`);
    }
  };

  const performSearch = (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filteredResults = tokens.filter(token => 
      token.name?.toLowerCase().includes(lowerCaseQuery) ||
      token.symbol?.toLowerCase().includes(lowerCaseQuery) ||
      token.canister_id?.toLowerCase().includes(lowerCaseQuery) ||
      token.display_name?.toLowerCase().includes(lowerCaseQuery)
    );

    const sortedResults = filteredResults.sort((a, b) => {
      const aMatches = [
        a.name?.toLowerCase().includes(lowerCaseQuery) || false,
        a.symbol?.toLowerCase().includes(lowerCaseQuery) || false,
        a.canister_id?.toLowerCase().includes(lowerCaseQuery) || false,
        a.display_name?.toLowerCase().includes(lowerCaseQuery) || false
      ].filter(Boolean).length;

      const bMatches = [
        b.name?.toLowerCase().includes(lowerCaseQuery) || false,
        b.symbol?.toLowerCase().includes(lowerCaseQuery) || false,
        b.canister_id?.toLowerCase().includes(lowerCaseQuery) || false,
        b.display_name?.toLowerCase().includes(lowerCaseQuery) || false
      ].filter(Boolean).length;

      return bMatches - aMatches;
    });

    setSearchResults(sortedResults);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!searchWrapVisible || document.activeElement !== inputRef.current) return;
    
      switch (event.key) {
        case 'ArrowDown':
          setFocusedIndex((prevIndex) =>
            Math.min(prevIndex + 1, searchResults.length - 1)
          );
          break;
        case 'ArrowUp':
          setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          break;
        case 'Enter':
          if (focusedIndex >= 0) {
            handleResultClick(searchResults[focusedIndex].canister_id);
          }
          break;
        case 'Escape':
          clearSearchAndClose(true);
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex, searchResults, searchWrapVisible]);

  return (
    <div className='inline-block relative'>
      <Tooltip title="Search Token" className='pointer'>
        {isWindowUnder640 ? (
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{
                ml: 0,
                my: 0,
                '&:hover': {
                  borderRadius: '12px',  // Change this value to your desired radius
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'  // Optional: background color on hover
                }
            }}
            aria-label="search"
            style={{
              fontSize: '14px'
            }}
          >
            <SearchIcon 
              fontSize="large" 
              className="mr-1" 
              style={{
                cursor: 'pointer',
                fontSize: '22px'
              }}
              aria-label="search"
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{
                ml: 0,
                my: 0,
                '&:hover': {
                  borderRadius: '12px',  // Change this value to your desired radius
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'  // Optional: background color on hover
                }
            }}
            aria-label="search"
            style={{
              fontSize: '14px'
            }}
          >
            <SearchIcon fontSize="inherit" className='mr-1' /> <span className='hidden sm:block'>Search</span>
          </IconButton>
        )}
      </Tooltip>

      {searchWrapVisible && (
        <div ref={dropdownRef} className='fixed w-full min-h-[40px] top-0 sm:p-0 p-2 sm:absolute left-0 sm:top-[-6px] sm:w-[320px] bg-white dark:bg-dark-bg z-[1000] sm:mt-[10px]' >
          <div className='relative'>
          <TextField
            inputRef={inputRef}
            value={searchQuery}
            onChange={handleInputChange}
            onBlur={clearSearchAndClose}
            placeholder="Search token..."
            variant="outlined"
            fullWidth
            size='small'
            inputProps={{style: {fontSize: 14}}} // font size of input text
            InputLabelProps={{style: {fontSize: 14}}} // font size of input label
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderWidth: '1px', // Reduced border width on focus
                },
              },
            }}
          />
          <IconButton
            onClick={clearSearchAndClose}
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', fontSize: '22px' }}
            className=' opacity-60'
            size='medium'
          >
            <CloseIcon />
          </IconButton>
          </div>
          <div className='dark:bg-dark-bg'>
            <div className={` ${searchQuery ? 'p-2 border border-t-0 dark:border-0' : ''} bg-gray-300/10 rounded-b dark:bg-white/5 bg-white max-h-[calc(100vh-55px)] sm:max-h-[380px] overflow-y-scroll`}>
              {searchQuery && searchResults.length === 0 ? (
                <div style={{ padding: '5px 0', textAlign: 'center', fontSize: '14px' }}>No results found</div>
              ) : (
                searchResults.map((result, index) => (
                  <Link
                    href={`/token/${result.canister_id}`}
                    key={result.canister_id}
                    onMouseDown={() => handleResultClick(result.canister_id)}
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    className={`px-4 py-2 rounded ${index === focusedIndex ? 'dark:bg-white/10 bg-gray-300/40' : ''}`}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    <div className='flex items-center'>
                      <TokenLogoAndName data={result} showFullContent={true} logoSizeClass='w-5 h-5' />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
