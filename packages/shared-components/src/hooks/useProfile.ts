import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { useRouter } from "next/router"
import jwt_decode from "jwt-decode"
import { User } from "@shared-types"
import { getNewToken } from "@shared-utils"
import { AccessToken } from "src/types/user/token"

export default function useProfile(redirect = true): {
  user: User | undefined
  isLoading: boolean
  setUser: Dispatch<SetStateAction<User | undefined>>
  accessToken: AccessToken | undefined
  setAccessToken: Dispatch<SetStateAction<AccessToken | undefined>>
} {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [accessToken, setAccessToken] = useState<AccessToken | undefined>(
    undefined
  )

  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let token = sessionStorage.getItem("access_token")

    if (!token) {
      if (redirect) {
        router.push("/login")
      }
      setIsLoading(false)
      return
    }

    let dataAccessToken = jwt_decode(token) as AccessToken
    setAccessToken(dataAccessToken)
    setUser(dataAccessToken.user as User)

    if (dataAccessToken.exp <= Date.now() / 1000) {
      getNewToken().then((newToken) => {
        dataAccessToken = jwt_decode(newToken)
        setAccessToken(dataAccessToken)
        setUser(dataAccessToken.user as User)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }

    // todo faire un call si besoin
  }, [setUser, setAccessToken, setIsLoading])

  return { user, isLoading, setUser, accessToken, setAccessToken }
}
