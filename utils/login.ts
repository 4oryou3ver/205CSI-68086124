import { Credential, logout } from "@/data/credential" 
import { useRouter } from "next/navigation" 

type Router = ReturnType<typeof useRouter>

// ... โค้ดที่เหลือด้านล่างเหมือนเดิม

export const checkLogin = (router: Router, returnPath: string) => {
  // back up return
  localStorage.setItem('returnPath', returnPath)
  // check credential
  const credentialString = localStorage.getItem('credential')
  if (credentialString !== null) {
    const { token, email, name, role }: Credential = JSON.parse(credentialString)
    if (
      token === undefined ||
      email === undefined ||
      name === undefined ||
      role === undefined
    ) {
      // fail
      router.replace('/login')
      router.refresh()
      return
    } else {
      // succes
      router.replace(returnPath)
      router.refresh()
    }
  } else {
    // fail
    router.replace('/login')
    router.refresh()
  }
}

export const doLogout = (router: Router, retrunPath: string) => {
  const credentialString = localStorage.getItem('credential')
  if (credentialString !== null) {
    const { token }: Credential = JSON.parse(credentialString)
    
    logout(token)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem('credential')
        router.replace(retrunPath)
        router.refresh()
      })
  } else {
    router.replace(retrunPath)
    router.refresh()
  }
}