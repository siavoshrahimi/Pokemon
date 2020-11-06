import React from "react";
import './Search.scss';


const Search = props =>(
    <div className="search">
        <input
            type="text"
            placeholder='Search Pokemon name'
            onChange={props.onChangeHandler}
            value={props.value}
        />
    </div>
)

export default Search;