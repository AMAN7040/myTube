import React from 'react'
import Comment from './ Comment'
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';


const CommentsContainer = ({video}) => {
  const { allComments } = useSelector((store) => store.comment);
  return (
    <div className='mx-2 text-white text-2xl my-4'>
      <p>{allComments.length} Comments</p>
      {/* <CommentForm/> */}
      <Comment />
    </div>
  )
}

export default CommentsContainer