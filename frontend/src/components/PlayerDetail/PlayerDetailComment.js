import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import classes from './playerDetailComment.module.css'
import PlayerDetailCommentItem from './PlayerDetailCommentItem'

const PlayerDetailComment = (props) => {

  const [comments, setComments] = useState(props.comments.reverse())
  const [currentPage, setCurrentPage] = useState(1)

  const deleteComment = () => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/player/${props.player}/comment/`,
      headers: {
        Authorization: `Token ${token}`
      },
    })
    .then((res) => {
      const newComments = res.data.reverse()
      setComments(newComments)
      if (currentPage === (comments.length-1)/10 + 1) {
        if (currentPage === 1) {
          return
        }
        setCurrentPage(currentPage-1)
      }
    })
    .catch(err => console.log(err))
  }
  
  // READ
  const currentComments = comments.slice((currentPage-1)*10, (currentPage-1)*10+10)
  const commentsList = currentComments.map((comment) => {
    return (
      <PlayerDetailCommentItem
        key={comment.id}
        comment={comment}
        deleteComment={deleteComment} />
    )
  })

  // CREATE
  const commentInput = useRef()
  const token = useSelector(state => state.login.token)
  const createComment = (event) => {
    event.preventDefault()
    if (!commentInput.current.value) {
      alert('내용을 입력해주세요')
      return
    }
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/player/${props.player}/comment/`,
      headers: {
        Authorization: `Token ${token}`
      },
      data: {
        'content': commentInput.current.value
      }
    })
    .then(res => {
      const newComments = res.data.reverse()
      setComments(newComments)
    })
    .catch(err => console.log(err))
    commentInput.current.value = ''
  }

  // pagination
  const pages = []
  if (currentPage === 1 || currentPage === 2) {
    for (let i=1; i<comments.length/10 + 1; i+=1) {
      pages.push(i)
      if (i === currentPage + 2) {
        break
      }
    }
  } else {
    for (let i=currentPage - 2; i<comments.length/10 + 1; i+=1) {
      pages.push(i)
      if (i === currentPage + 2) {
        break
      }
    }
  }

  const pageList = pages.map((page) => {
    return (
      <div 
        key={page} 
        className={
          `${classes.playerDetailCommentPage} 
          ${page===currentPage ? classes.playerDetailCommentPageActive : ''}`
        } 
        onClick={() => {setCurrentPage(page)}} >
        {page}
      </div>
    )
  })

  const prevComment = () => {
    if (currentPage === 1) {
      return
    } else {
      setCurrentPage(currentPage-1)
    }
  }

  const nextComment = () => {
    if (currentPage > comments.length/10) {
      return
    } else {
      setCurrentPage(currentPage+1)
    }
  }

  // JSX
  return (
    <div className={classes.playerDetailComment}>
      <div className={classes.playerDetailCommentHeader}>
        <div>응원</div>
        <div className={classes.playerDetailCommentCnt}>{comments.length}</div>
      </div>
      <form className={classes.playerDetailCommentForm} onSubmit={createComment}>
        <input type="text" ref={commentInput} placeholder="응원을 남겨주세요"/>
      </form>
      <div className={classes.playerDetailCommentItems}>
        {commentsList}
      </div>
      <div className={classes.playerDetailCommentPageList}>
        <div className={classes.playerDetailCommentBtn} onClick={prevComment}>prev</div> 
        {pageList} 
        <div className={classes.playerDetailCommentBtn} onClick={nextComment}>next</div>
      </div>
    </div>
  )
}

export default PlayerDetailComment