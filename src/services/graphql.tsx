import { isLoggedIn, getAccessToken } from "./nonql";

const url = "https://gq0fs.sse.codesandbox.io/graphql";

async function graphqlRequests(query: string, variables: object = {}) {
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables })
  };
  if (isLoggedIn()) {
    request.headers["Authorization"] = `Bearer ${getAccessToken()}`;
  }
  const response = await fetch(url, request);

  const responseJSN = await response.json();
  if (responseJSN?.errors) {
    console.log(responseJSN?.errors);
    const errMessage = responseJSN?.errors
      .map((er: any) => er?.message)
      .join("\n");
    throw new Error(errMessage);
  }
  console.log("response", responseJSN.data);
  return responseJSN.data;
}

export async function GetJobs() {
  const query = `
  query{
    jobs{
      id
      title
      description
      company {
        id
        name
        description
      }
    }
  }   
`;

  const { jobs } = await graphqlRequests(query);
  return jobs;
}

export async function GetJob(id: string) {
  const query = `
  query JobQuery($jobId: ID!) {
    job(id: $jobId) {
      id
      title
      description
      company {
        id
        name
        description
      }
    }
  }  
`;

  const { job } = await graphqlRequests(query, { jobId: id });
  return job;
}

export async function GetCompany(id: string) {
  const query = `query CompanyQuery($companyId: ID!) {
    company(id: $companyId) {
      id
      name
      description
      jobs{
        id
        title
        description
      }
    }
  }`;

  const { company } = await graphqlRequests(query, { companyId: id });
  return company;
}

export async function PostNewJob(
  companyId: string,
  title: string,
  description: string
) {
  const mutation = `
  mutation Mutation($input: CreateJobField) {
    createJob(input: $input)
  }`;

  const input = { companyId, title, description };
  const { createJob } = await graphqlRequests(mutation, { input });

  return createJob;
}
