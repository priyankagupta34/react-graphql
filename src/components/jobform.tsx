import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostNewJob } from "../services/graphql";

const JobForm = () => {
  const [title, settitle] = useState<string>("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();

  async function handleClick(e: any) {
    e.preventDefault();
    const id = await PostNewJob(title, description);
    navigate(`/jobs/${id}`, { replace: true });
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)} className="backlink">
          Back
        </button>
      </div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: "10em" }}
                name="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="linkcreatenw" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
