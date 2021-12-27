import { Link } from "react-router-dom";
import { Job } from "./interfaces/Job";

const JobBoard = ({ jobs }: any): JSX.Element => (
  <div className="boardList">
    {jobs.map((item: Job, index: number) => (
      <div key={item.id} className="board">
        <Link to={`/jobs/${item.id}`} className="link">
          {item?.title}
        </Link>
      </div>
    ))}
  </div>
);

export default JobBoard;
