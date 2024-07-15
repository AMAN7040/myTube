import React from 'react'
import Comment from './ Comment'
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';


const CommentsContainer = ({video}) => {
  const { allComments } = useSelector((store) => store.comment);
  const user = useSelector((store) => store.user.userInfo);
  return (
    <div className='mx-2 text-white text-2xl my-4'>
      <p>{allComments.length} Comments</p>
      {user ? <CommentForm/> : <p className='mx-5 text-[15px]'>Login to post a comment</p>}
      <Comment />
    </div>
  )
}

export default CommentsContainer