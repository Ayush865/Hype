import express from "express";
import { getFeedPosts, getUserPosts, likePost,createPost,addCommentToPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
// create

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comments", verifyToken, addCommentToPost);

export default router;
