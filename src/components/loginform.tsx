import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInside, logout } from "./../services/nonql";

const LoginForm = ({ handleLogin }) => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const navigate = useNavigate();
  const [msg, setmsg] = useState("");

  async function handleClick(e: any) {
    e.preventDefault();
    const successOrNot = await LoginInside(email, password);
    setmsg("");
    if (!successOrNot.ok) {
      logout();
      setmsg(successOrNot.statusText);
      return;
    }
    handleLogin();
    navigate("/");
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)} className="backlink">
          Back
        </button>
      </div>
      <h1 className="title">Login</h1>
      <div className="box">
        <form onSubmit={handleClick}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="linkcreatenw" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {msg ? <div className="showmsg">{msg}</div> : null}
    </div>
  );
};

export default LoginForm;
