import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import classes from './playerDetailModal.module.css'

const PlayerDetailModal = forwardRef((props, ref) => {

  const [likeChampions, setLikeChampions] = useState([])
  const modalInput = useRef()
  const token = useSelector(state => state.login.token)

  const selectChampion = (champion) => {
    modalInput.current.focus()
    const newLikeChampions = [...likeChampions]
    if (newLikeChampions.includes(champion)) {
      const idx = newLikeChampions.indexOf(champion)
      newLikeChampions.splice(idx, 1)
    } else {
      if (newLikeChampions.length === 3) {
        alert('최대 세 개까지만 선택가능합니다.')
      } else {
        newLikeChampions.push(champion)
      }
    }
    setLikeChampions(newLikeChampions)
  }

  const finishSelectChampion = () => {
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/player/${props.nickname}/most3/`,
      headers: {
        Authorization: `Token ${token}`
      },
      data: {
        'info': likeChampions
      }
    })
    .then(res => props.selectChampion(res.data))
    .catch(err => console.log(err))
  }

  const allChampions = useMemo(() => {
    return (
      ['가렌', '갈리오', '갱플랭크', '그라가스', '그레이브즈', '그웬', '나르', '나미', '나서스', '노틸러스', '녹턴', '누누와 윌럼프', '니달리', '니코', '닐라', '다리우스', '다이애나', '드레이븐', '라이즈', '라칸', '람머스', '럭스', '럼블', '레나타 글라스크', '레넥톤', '레오나', '렉사이', '렐', '렝가', '루시안', '룰루', '르블랑']
      )
    }, [])
  const [champions, setChampions] = useState(allChampions)
  const [inputData, setInputData] = useState('')

  const searchChampion = (event) => {
    setInputData(event.target.value)
    // 즉시 변경
    // const newChampions = allChampions.filter((champion) => {
    //   return champion.includes(event.target.value)
    // })
    // setChampions(newChampions)
  }
  
  // 0.2ms 텀 주고 변경
  useEffect(() => {
    const debounce = setTimeout(() => {
      const newChampions = allChampions.filter((champion) => {
        return champion.includes(inputData)
      })
      setChampions(newChampions)
    }, 200)
    return () => {
      clearTimeout(debounce)
    }
  }, [inputData, allChampions])

  const championList = champions.map(champion => {
    return (
      <div onClick={() => {selectChampion(champion)}} key={champion} className={classes.playerDetailModalItems}>
        {!likeChampions.includes(champion) && <img className={classes.heartBlankImg} src={require('../../imgs/icons/heart_blank.png')} alt="" />}
        {likeChampions.includes(champion) && <img className={classes.heartFillImg} src={require('../../imgs/icons/heart_fill.png')} alt="" />}
        <img className={classes.championImg} src={require('../../imgs/people/DWG KIA/deft.png')} alt="" />
        <div className={classes.championName}>{champion}</div>
      </div>
    )
  })

  return (
    <div ref={ref} className={classes.playerDetailModal}>
      <div className={classes.playerDetailModalInputBackground}>
        <input 
          className={classes.playerDetailModalInput} 
          type="text" 
          placeholder='챔피언을 검색해주세요'
          value={inputData}
          onChange={searchChampion}
          ref={modalInput}
          />
        <button onClick={props.closeModal} className={classes.playerDetailModalExitBtn}>
          x
        </button>
      </div>
      <div className={classes.playerDetailModalContainer}>
        {championList}
      </div>
      <button onClick={finishSelectChampion} className={classes.playerDetailModalSelectFinishBtn}>선택 종료</button>
    </div>
  )
}
)

export default PlayerDetailModal