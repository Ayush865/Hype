import React, { useState } from "react";
import "../CommentInput.css"
const CommentInput = ({ postId, onAddComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    // Perform any validation or data processing here if needed
    onAddComment(postId, comment);
    // Clear the input field after adding the comment
    setComment("");
  };

  return (
    <div className="comment_container">
      <input
        type="text"
        placeholder="Enter your comment..."
        value={comment}
        onChange={handleCommentChange}
        className="comment_input" 
      />
      <button onClick={handleAddComment} className="comment_btn">Comment</button>
    </div>
  );
};

export default CommentInput;
