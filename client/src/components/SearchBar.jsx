import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { FaSearch } from "react-icons/fa";

import "../SearchBar.css";

export const SearchBar = ({ setResults,userId }) => {
  
  const [input, setInput] = useState("");
  const[Loading,setLoading]=useState(false);
  const token = useSelector((state) => state.token);
  useEffect(()=>{
    const fetchData = (value) => {
  
      fetch(`http://localhost:3001/users/searchFriend?query=Ethan`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
    
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Search Results:', data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error here
        });
        };

        if(Loading===true)
        {
          fetchData(input);
        }
  },[Loading])
  
  const handleChange = (value) => {
    setInput(value);
    // fetchData(value);
    // setLoading(true);
  };

  return (
    <div className="input-wrapper">
      {/* <FaSearch id="search-icon" /> */}
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={()=>{setLoading(true)}}>Click</button>
    </div>
  );
};
