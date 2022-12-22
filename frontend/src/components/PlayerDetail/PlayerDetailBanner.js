import classes from './playerDetailBanner.module.css'

const PlayerDetailBanner = (props) => {

  return (
    <div className={classes.playerBanner}>
      <div className={classes.playerBannerLeft}>
        {/* <img className="banner-img" src={require(`imgs/people/${props.team}/${props.nickname}.png`).default} alt="" /> */}
        <img className={classes.bannerImg} src={require('../../imgs/people/DWG KIA/deft.png')} alt=""/>
        <div className={classes.backgroundText}>2023 {props.nickname} 2023 {props.nickname} 2023 {props.nickname} 2023</div>
        <div className={classes.backgroundText}>{props.nickname} 2023 {props.nickname} 2023 {props.nickname} 2023 {props.nickname}</div>
        <div className={classes.backgroundText}>2023 {props.nickname} 2023 {props.nickname} 2023 {props.nickname} 2023</div>
        <div className={classes.backgroundText}>{props.nickname} 2023 {props.nickname} 2023 {props.nickname} 2023 {props.nickname}</div>
        <div className={classes.backgroundText}>2023 {props.nickname} 2023 {props.nickname} 2023 {props.nickname} 2023</div>
      </div>
      <div className={classes.playerInfo}>
        <div className={classes.playerNickname}>{props.nickname}</div>
        <div className={classes.playerRealname}>{props.realname}</div>
        <div className={classes.playerExtraInfo}>
          <div>소속팀</div>
          <div>{props.team}</div>
        </div>
        <div className={classes.playerExtraInfo}>
          <div>생년월일</div>
          <div>{props.birth}</div>
        </div>
        <div className={classes.playerExtraInfo}>
          <div>데뷔</div>
          <div>{props.debut_date}</div>
        </div>
      </div>
    </div>
  )
}

export default PlayerDetailBanner