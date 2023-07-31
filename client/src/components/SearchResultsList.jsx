import "../SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import {
  useTheme
} from "@mui/material";


export const SearchResultsList = ({ results }) => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const containerStyle = {
    backgroundColor: background,
    opacity:0.99,
    borderRadius:'9px'
  };
  return (
    <div className="results-list" style={containerStyle}>
      {results && results.length>0 && results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
};
