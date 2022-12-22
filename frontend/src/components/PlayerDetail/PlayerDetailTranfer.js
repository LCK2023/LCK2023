import classes from './playerDetailTransfer.module.css'

const PlayerDetailTranfer = (props) => {

  const transferInfo = props.transferInfo

  const transferList = transferInfo.map((info) => {
    return (
      <div className={classes.playerDetailTranferItems} key={info.id}>
        <a href={info.page_url}>
          <img src={require(`../../imgs/logos/DRX.png`)} alt="" />
        </a>
        <div>{info.year}</div>
      </div>
    )
  })

  return (
    <div className={classes.playerDetailTranfer}>
      <div className={classes.playerDetailTranferHeader}>이적정보</div>
      <div className={classes.playerDetailTranferContainer}>
        { transferList }
      </div>
    </div>
  )
}

export default PlayerDetailTranfer