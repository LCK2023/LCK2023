import classes from './playerDetailMost3.module.css'

const PlayerDetailMost3 = (props) => {

  const champions = props.most3

  const championList = champions.map((champion) => {
    return (
      <div key={champion.champion} className={classes.most3Items}>
        <div className={classes.most3Img}>
          {/* op.gg 링크 가려면 챔피언 영어 이름도 알아야 함 */}
          <a href={"https://www.op.gg/champions/" + champion.champion}>
            <img src={require('../../imgs/people/DWG KIA/deft.png')} alt="" />
          </a>
        </div>
        <div className={classes.percentage}>{champion.percentage}%</div>
      </div>
    )
  })

  return (
    <div className={classes.playerDetailMost3}>
      <div className={classes.most3Header}>
        <div className={classes.most3Title}>
          Most 3
        </div>
        <button onClick={props.openModal}>투표하기</button>
      </div>
      <div className={classes.most3Container}>
        { championList }
      </div>
    </div>
  )
}

export default PlayerDetailMost3