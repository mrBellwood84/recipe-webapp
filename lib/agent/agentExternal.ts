import sessionManager from "@/lib/session/sessionManager";

export const agentExternal = {
  get: async (url: string) => {
    const token = await sessionManager.getToken();
    return await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
  },
  post: async (url: string, body: object) => {
    const token = await sessionManager.getToken();
    return await fetch(url, {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
  },
  put: async (url: string, body: object) => {
    const token = await sessionManager.getToken();
    return await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
  },
  delete: async (url: string, body?: object) => {
    const token = await sessionManager.getToken();
    return await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
  },
}