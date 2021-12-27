import JobBoard from "./components/jobboard";
import CompanyDetail from "./components/companydetail";
import JobForm from "./components/jobform";
import JobDetail from "./components/jobdetail";
import LoginForm from "./components/loginform";

const AppRoutes = ({ listOfJobs, handleLogin }) => {
  let routes = useRoutes([
    { path: "/", element: <JobBoard jobs={listOfJobs} /> },
    { path: "/companies/:companyId", element: <CompanyDetail /> },
    { path: "/jobs/new/:companyId", element: <JobForm /> },
    { path: "/jobs/:jobId", element: <JobDetail /> },
    {
      path="/login",
      children={() => <LoginForm onLogin={handleLogin} />}
    }
  ]);
  return routes;
};
