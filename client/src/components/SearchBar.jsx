import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { FaSearch } from "react-icons/fa";
import {
  useTheme
} from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import "../SearchBar.css";

export const SearchBar = ({ setResults,userId,placeholder,fill }) => {
  
  const [input, setInput] = useState("");
  const[Loading,setLoading]=useState(false);
  const[data,setData]=useState([]);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const containerStyle = {
    backgroundColor: background, // Replace this with your desired background color
    // padding: '10px', // Adjust the padding as needed
    borderRadius: '9999px', // Adjust the border radius as needed
  };
  useEffect(()=>{
    const fetchData = (value) => {
  
      fetch(`http://localhost:3001/searchFriend?keyword=${input}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
    
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Search Results:', data);
          setLoading(false);
          setResults(data);
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
    setLoading(true);
    if(value=="")
    {
      setInput("")
      setResults([])
      setLoading(false)
    }
  };

  return (
    <div className="container-input" style={containerStyle}>
      <input type="text" placeholder={placeholder} name="text" className="input" 
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          
          />
      <svg fill={fill} width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
        <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd" />
      </svg>
    </div>
    
  );
};
