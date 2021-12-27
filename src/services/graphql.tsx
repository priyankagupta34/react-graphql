const url = "https://gq0fs.sse.codesandbox.io/graphql";

async function graphqlRequests(query: string, variables: object = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables })
  });

  const responseJSN = await response.json();
  if (responseJSN?.errors) {
    console.log(responseJSN?.errors);
    const errMessage = responseJSN?.errors
      .map((er: any) => er?.message)
      .join("\n");
    throw new Error(errMessage);
  }
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
  const mutation = `mutation Mutation($companyId: ID, $title: String, $description: String) {
    createJob(companyId: $companyId, 
      title: $title, 
      description: $description)
  }`;

  const { createJob } = await graphqlRequests(mutation, {
    companyId,
    title,
    description
  });
  return createJob;
}
