"use client"
import { SessionProvider } from "next-auth/react"

const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  return(
    <SessionProvider>
      { children }
    </SessionProvider>
  )
=======
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
>>>>>>> e2b454520653e1cea4624894e26b71d586b9c928
}

export default AuthProvider;
