import { YT_COMMENT_POST } from "../utils/constants";

const usePostComment = async(channelId, videoId, commentText) => {
    
    const requestBody = {
        snippet: {
          channelId,
          videoId,
          topLevelComment: {
            snippet: {
              textOriginal: commentText,
            },
          },
        },
    };
    
    const response = await fetch(YT_COMMENT_POST, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
     throw new Error('Failed to post comment');
    }
    
    // Handle response data or return it as needed
     const responseData = await response.json();
    return responseData;
};

export default usePostComment;




  

  
