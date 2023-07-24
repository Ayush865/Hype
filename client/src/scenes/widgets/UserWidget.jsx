import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme,IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
// import WorkIcon from '@mui/icons-material/Work';


const UserWidget = ({ userId, picturePath, isFriendProfile = false }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);


  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async (source) => {

    axios.get(`http://localhost:3001/users/${userId}?callerId=${_id}`,{
      headers : {
        Authorization : `Bearer ${token}`,
        cancelToken : source.token
      }
    }).then((res)=>{
      // console.log("hi")
      setUser(res?.data);
    }).catch((err)=>{
      console.log("An error occured!")
    })
    // const response = await fetch(`http://localhost:3001/users/${userId}?callerId=${_id}`, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // const data = await response.json() ;
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getUser(source);

    return () =>{ source.cancel('Request cancelled !')}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        {/* <ManageAccountsOutlined /> */}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PersonPinCircleRoundedIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        {/* <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween> */}
        <FlexBetween>
          <Typography color={medium}>Impressions of profile:</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Other Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
          <IconButton>
            <TwitterIcon style={{ fontSize: '1.5rem' }}/>
          </IconButton>
          
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          {
            !isFriendProfile &&
            <EditOutlined sx={{ color: main }} />
          }
          
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
          <IconButton >
            <LinkedInIcon style={{ fontSize: '1.5rem' }} />
          </IconButton>
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {!isFriendProfile &&
          <EditOutlined sx={{ color: main }} />}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
