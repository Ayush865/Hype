import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
// import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import CommentInput from "components/CommentInput"
// import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [showComments, setshowComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserFirstName=useSelector((state)=>state.user.firstName);
  // const existingComments =useSelector((state)=>state.posts.comments);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [comment, setComment] = useState("");

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

const handleAddComment = async (postId, comment) => {
  try {
    // Add logic here to send the comment to the server or update the post's comment state
    console.log(`Adding comment '${comment}' to post with ID '${postId}'`);
    const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commenterName: loggedInUserFirstName, commentDescription: comment }),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    const updatedPost = await response.json();

    // Assuming you have access to the 'dispatch' function to update the post state using Redux
    dispatch(setPost({ post: updatedPost }));
  } catch (error) {
    console.error("Error adding comment:", error.message);
    // Handle error or show a notification to the user if necessary
  }
};


  return (
    <WidgetWrapper mb="2rem ">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      /> 
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined /> 
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setshowComments(!showComments)}>
              <InsertCommentOutlinedIcon />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        
        <IconButton>
          <ShareOutlined />
        </IconButton>
        
      </FlexBetween>
      <CommentInput postId={postId} onAddComment={handleAddComment} />
      {showComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.commenterName} : {comment.commentDescription}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
    //   <div>
    //   <h2>Comments</h2>
    //   {comments && comments.length>0 && comments.map((comment) => (
    //     <div key={comment._id}>
    //       <p> {comment.commenterName} : {comment.commentDescription}
    //        {/* :  {new Date(comment.commentDate).toLocaleString()} */}
    //       </p>
          
    //     </div>
    //   ))}
    // </div>
    
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
