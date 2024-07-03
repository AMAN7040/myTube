import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import usePostComment from '../hooks/usePostComment';

const CommentForm = () => {
    const [commentText, setCommentText] = useState('');
    const video = useSelector((store) => store.video.watchVideo);
    const post = usePostComment(video?.id, video?.snippet?.channelId, commentText); // Example: Get channelId from Redux state or elsewhere
  
    const handlePostComment = async () => {
      if (!commentText.trim()) {
        alert('Please enter a comment');
        return;
      }
  
      try {
        await post();
        alert('Comment posted successfully!');
        setCommentText('');
        // Optionally, you can update state or fetch updated comments list here
      } catch (error) {
        alert('Failed to post comment');
        console.error(error);
      }
    };
  
    return (
      <div>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          rows={4}
          cols={50}
          required
        />
        <br />
        <button onClick={handlePostComment}>Post Comment</button>
      </div>
    );
  };
  


export default CommentForm;