import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetJob } from "../services/graphql";
import { Job } from "./interfaces/Job";
import { Link } from "react-router-dom";

const JobDetail = () => {
  let history = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  useEffect(() => {
    (async () => {
      let response = await GetJob(jobId || "");
      setJob(response);
    })();
  }, [jobId]);

  return (
    <div>
      <button onClick={() => history(-1)} className="backlink">
        Back
      </button>
      <h1>{job?.title}</h1>
      <Link className="link companyLink" to={`/companies/${job?.company?.id}`}>
        {job?.company?.name}
      </Link>
      <div className="jobdetaidec">{job?.description}</div>
    </div>
  );
};

export default JobDetail;
