import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetCompany } from "../services/graphql";
import { Company } from "./interfaces/Company";
import { Link } from "react-router-dom";

const CompanyDetail = () => {
  let history = useNavigate();
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  useEffect(() => {
    (async () => {
      let response = await GetCompany(companyId || "");
      setCompany(response);
    })();
  }, [companyId]);

  return (
    <div>
      <button onClick={() => history(-1)} className="backlink">
        Back
      </button>
      <h1>{company?.name}</h1>
      <div className="jobdetaidec">{company?.description}</div>
      <h5>Jobs at {company?.name}</h5>
      <ul className="listOfjobincom">
        {company?.jobs?.map((job, index) => (
          <li key={index}>
            <Link to={`/jobs/${job.id}`} className="link">
              {job?.title}: {job?.description}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`/jobs/new/${company?.id}`} className="link linkcreatenw btnsp">
        New Job{" "}
      </Link>
    </div>
  );
};

export default CompanyDetail;
