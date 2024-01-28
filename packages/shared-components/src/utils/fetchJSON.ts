import { HttpMethod, HttpResponse } from "@shared-types"
import { getNewToken } from "@shared-utils"
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const originalRequest = async (
  url: string,
  method: HttpMethod,
  token: string | null,
  body?: object
) => {
  console.log("toto")
  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: (token ? `Bearer ${token}` : undefined) as string,
      "Content-Type": "application/json",
    },
  })

  return res
}

export async function fetchJSON(
  url: string,
  method: HttpMethod = "GET",
  body?: any
): Promise<HttpResponse> {
  let token = null
  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("access_token")
  }
  let res = await originalRequest(url, method, token, body)
  let isJson =
    res.headers.get("Content-Type")?.indexOf("application/json") !== -1

  if (res.status === 401) {
    const newToken = await getNewToken()
      .then((newToken) => newToken)
      .catch(() => false)

    res = await originalRequest(url, method, newToken, body)
    isJson = res.headers.get("Content-Type")?.indexOf("application/json") !== -1
  }

  const json = isJson ? await res.json() : undefined

  if (res.ok) return json

  return Promise.reject(json ? json : res.status)
}
