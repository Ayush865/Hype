import "../SearchResult.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTheme
} from "@mui/material";


export const SearchResult = ({ result }) => {

  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const containerStyle = {
    backgroundColor: isHovered ?neutralLight:background, 
    // borderRadius: '9999px',
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const navigate = useNavigate();
  return (
    <div
      className="search-result"
      onClick={() => navigate(`/profile/${result._id}`)}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {result.firstName} {result.lastName}
    </div>
  );
};
