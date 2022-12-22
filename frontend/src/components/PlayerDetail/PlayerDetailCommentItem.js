import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import classes from './PlayerDetailCommentItem.module.css'

const PlayerDetailCommentItem = (props) => {

  const [comment, setComment] = useState(props.comment)
  const [editedComment, setEditedComment] = useState(props.comment)
  const [mode, setMode] = useState('read')
  const username = useSelector(state => state.login.username)
  const token = useSelector(state => state.login.token)
  const commentInputRef = useRef()

  useEffect(() => {
    if (mode === 'edit') {
      commentInputRef.current.focus()
    }
  }, [mode])

  const editComment = (event) => {
    const newComment = {...editedComment}
    newComment.content = event.target.value
    setEditedComment(newComment)
  }

  const cancelEditComment = () => {
    setEditedComment(comment)
    setMode('read')
  }

  const updateComment = (event) => {
    event.preventDefault()
    if (!comment.content) {
      alert('내용을 입력해주세요')
      return
    }
    axios({
      method: 'put',
      url: `http://127.0.0.1:8000/player/comment/${comment.id}/`,
      headers: {
        Authorization: `Token ${token}`
      },
      data: {
        'content': editedComment.content
      }
    })
    .then(() => {
      setComment(editedComment)
      setMode('read')
    })
    .catch(err => console.log(err))
  }

  const deleteComment = () => {
    axios({
      method: 'delete',
      url: `http://127.0.0.1:8000/player/comment/${comment.id}/`,
      headers: {
        Authorization: `Token ${token}`
      },
    })
    .then(() => props.deleteComment())
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className={classes.playerDetailCommentItemHeader}>
        <div>{comment.username}</div>
        <div>{comment.created_at.slice(0, 10) + ' ' + comment.created_at.slice(11, 16)}</div>
      </div>
      <div className={classes.playerDetailCommentItemContent}>
        {username===comment.username && mode==='read' &&
          <div>{comment.content}</div>
        }
        {username===comment.username && mode==='edit' &&
            <form className={classes.playerDetailCommentItemForm} onSubmit={updateComment}>
              <input 
                type="text" 
                placeholder='응원을 수정해주세요'
                value={editedComment.content}
                ref={commentInputRef}
                onChange={editComment}
                onBlur={cancelEditComment} />
            </form>
        }
        <div className={classes.playerDetailCommentItemBtn}>
          {username===comment.username && mode==='read' &&
            <img onClick={() => setMode('edit')} src={require('../../imgs/icons/edit.png')} alt=""/>
          }
          {username===comment.username && 
            <img onClick={deleteComment} src={require('../../imgs/icons/delete.png')} alt=""/>
          }
        </div>
      </div>
    </div>
  )
}

export default PlayerDetailCommentItem