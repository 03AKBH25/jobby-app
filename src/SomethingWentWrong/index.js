import './index.css'

const SomethingWentWrong = ({onRetry}) => (
  <div className="main-cont-aniket">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-aniket"
    />
    <h1 className="main-head-aniket">Oops! Something Went Wrong</h1>
    <p className="desc-aniket">
      We cannot seem to find the page you are looking for.
    </p>
    <button type="button" onClick={onRetry} className="btn-aniket">
      Retry
    </button>
  </div>
)

export default SomethingWentWrong
