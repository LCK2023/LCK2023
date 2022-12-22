import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

import classes from'./playerDetail.module.css'
import PlayerDetailBanner from './PlayerDetailBanner'
import PlayerDetailMost3 from './PlayerDetailMost3'
import PlayerDetailModal from './PlayerDetailModal'
import PlayerDetailTranfer from "./PlayerDetailTranfer"
import PlayerDetailComment from "./PlayerDetailComment"

const PlayerDetail = () => {
  const params = useParams()

  const [playerInfo, setPlayerInfo] = useState([])
  const [readyToRender, setReadyToRender] = useState(false)
  const [isHavingMost3, setIsHavingMost3] = useState(false)
  const [mode, setMode] = useState('close')

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/player/${params.nickname}/`
    })
    .then(res => {
      setPlayerInfo(res.data)
      setReadyToRender(true)
      if (res.data.most3.length > 0) {
        setIsHavingMost3(true)
      }
    })
    .catch(err => console.log(err))
  }, [params.nickname])

  const openModal = () => {
    setMode('open')
  }

  const closeModal = () => {
    setMode('close')
  }

  const clickOutsideModal = (event) => {
    if (mode === 'open') {
      if (!playerDetailModalRef.current.contains(event.target)) {
        setMode('close')
      }
    }
  }


  const selectChampion = (likeChampions) => {
    const newPlayerInfo = {...playerInfo}
    newPlayerInfo.most3 = likeChampions.most3
    setPlayerInfo(newPlayerInfo)
    setMode('close')
  }

  const playerDetailModalRef = useRef()

  return (
    <div className={classes.playerDetail} onClick={clickOutsideModal}>

      { readyToRender && 
        <PlayerDetailBanner 
          nickname={playerInfo.nickname}
          realname={playerInfo.realname}
          debut_date={playerInfo.debut_date}
          birth={playerInfo.birth}
          team={playerInfo.team.t_name} />
      }

      { isHavingMost3 && 
        <PlayerDetailMost3 
          most3={playerInfo.most3}
          openModal={openModal} />
      }

      { mode === 'open' && 
        <PlayerDetailModal 
          closeModal={closeModal}
          selectChampion={selectChampion}
          nickname={playerInfo.nickname}
          ref={playerDetailModalRef} />
      }

      { readyToRender && 
        <PlayerDetailTranfer
          transferInfo={playerInfo.transfer_set} />
      }

      { readyToRender && 
        <PlayerDetailComment 
          player={params.nickname}
          comments={playerInfo.comment_set}/> }

    </div>
  )
}

export default PlayerDetail