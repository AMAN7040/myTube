import React, { memo } from 'react';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';

const CommentsContainer = ({ video }) => {
  const { allComments } = useSelector((store) => store.comment);
  const user = useSelector((store) => store.user.userInfo);

  return (
    <div className='mx-0 text-white text-[13px] md:text-sm my-3 lg:text-xl lg:mx-2 2xl:mx-2 2xl:text-2xl 2xl:my-4'>
      <p>{allComments.length} Comments</p>
      {user ? <CommentForm /> : <p className='mx-1 text-[10px] lg:text-[13px] 2xl:mx-5 2xl:text-[15px]'>Login to post a comment</p>}
      <Comment />
    </div>
  );
}

export default memo(CommentsContainer);

