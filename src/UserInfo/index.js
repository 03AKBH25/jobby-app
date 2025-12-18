import './index.css'
import Loader from 'react-loader-spinner'
import NotFound from '../NotFound'

const UserInfo = ({details, userApiStatus, retry}) => {
  const renderLoading = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  )

  const renderSuccess = () => (
    <div className="profile-cont-aniket">
      <img
        src={details.profileImg}
        alt="User Img"
        className="user-img-aniket"
      />
      <h1 className="head-aniket">{details.name}</h1>
      <p className="detail-aniket">{details.shortBio}</p>
    </div>
  )

  const renderFailure = () => (
    <div className="retry-container-aniket">
      <button type="button" className="retry-btn-aniket" onClick={retry}>
        Retry
      </button>
    </div>
  )

  switch (userApiStatus) {
    case 'LOADING':
      return renderLoading()

    case 'SUCCESS':
      return renderSuccess()

    case 'FAILURE':
      return renderFailure()

    default:
      return <NotFound />
  }
}

export default UserInfo
