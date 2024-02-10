import { fetchJSON } from "@shared-utils"

export async function getNewToken() {
  const accessToken = sessionStorage.getItem("access_token")
  const refreshToken = sessionStorage.getItem("refresh_token")

  try {
    const json = await fetchJSON("/auth/refresh", "POST", {
      accessToken,
      refreshToken,
    })
    sessionStorage.setItem("access_token", json.body.access_token)
    return json.body.access_token
  } catch {
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("refresh_token")
    return false
  }
}
