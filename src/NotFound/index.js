import './index.css'

const NotFound = () => (
  <div className="main-cont">
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      alt="no jobs"
      className="main-img"
    />
    <h1 className="main-head">No Jobs Found</h1>
    <p className="desc">We could not find any jobs. Try other filters</p>
  </div>
)

export default NotFound
