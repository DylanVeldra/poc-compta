import { fetchJSON } from "@shared-utils"

export async function getNewToken() {
  const token = sessionStorage.getItem("refresh_token")

  sessionStorage.removeItem("access_token")
  try {
    const json = await fetchJSON("/auth/refresh", "POST", { token })
    sessionStorage.setItem("access_token", json.body.access_token)
    return json.body.access_token
  } catch {
    sessionStorage.removeItem("refresh_token")
    return false
  }
}
