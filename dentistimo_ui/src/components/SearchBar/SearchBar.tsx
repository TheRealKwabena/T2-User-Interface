import React from 'react';
import './SearchBar.css';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar: React.FC = () => {
    return (
        <div className='search_bar'>
            <div className='search_input'>
                <input type='text' placeholder='Search...'/>
                <div className="icon_container"></div>
            </div>
            <div className='autocomplete_result'></div>
        </div>
    )
}


export default SearchBar;