const url = "https://gq0fs.sse.codesandbox.io/login";

const accessTokenKey = "accessToken";

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

export async function LoginInside(email: string, password: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  console.log("sssss", response);
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem(accessTokenKey, token);
    console.log(token);
  }
  return response;
}

export function isLoggedIn() {
  return !!localStorage.getItem(accessTokenKey);
}

export function logout() {
  localStorage.removeItem(accessTokenKey);
}
