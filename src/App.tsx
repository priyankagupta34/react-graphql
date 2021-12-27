import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GetJobs } from "./services/graphql";
import NavBar from "./components/navbar";
import "./styles.css";
import AppRoutes from "./AppRoutes";

export default function App() {
  const [listOfJobs, setListOfJobs] = useState([]);
  useEffect(() => {
    (async () => {
      let response = await GetJobs();
      setListOfJobs(response);
      console.log("response", response);
    })();
  }, []);

  function handleLogin() {}
  return (
    <div className="app">
      <Router>
        <nav>
          <NavBar />
        </nav>

        <section className="section">
          <div className="container">
            <AppRoutes listOfJobs={listOfJobs} handleLogin={handleLogin} />
          </div>
        </section>
      </Router>
    </div>
  );
}
