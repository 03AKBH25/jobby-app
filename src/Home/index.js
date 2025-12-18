import './index.css'
import {Link} from 'react-router-dom'

const Home = () => (
  <>
    <div className="main-parent-cont">
      <div className="content-container">
        <h1 className="main-head-one">Find The Job That Fits Your Life</h1>
        <p className="desc-of">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilites and potential
        </p>

        <Link to="/jobs" className="link-btn">
          <button type="button" className="btn-mine">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
