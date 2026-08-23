export const agentExternal = {
  get: async (url: string) => {
    return await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
    })
  },
  post: async (url: string, body: object) => {
    return await fetch(url, {
      method: 'POST',
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  },
  put: async (url: string, body: object) => {
    return await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  },
  delete: async (url: string, body?: object) => {
    return await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  },
}