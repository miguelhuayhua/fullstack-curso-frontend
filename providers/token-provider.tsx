"use client"
import { createContext, useContext, useEffect, useState } from "react"

const tokenContext = createContext({
    token: "",
    loading: true,
    updateToken: (accessToken: string) => { }
});

const TokenProvider = ({ children }: any) => {
    const [token, setToken] = useState("");

    const [loading, setLoading] = useState(true)
    const updateToken = (accessToken: string) => {
        setToken(accessToken);
    }

    useEffect(() => {
        setLoading(true);
        if (!token) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh_token`, {
                method: "POST",
                credentials: "include"
            }).then(async res => {
                const data = await res.json();
                if (data.estado == 200) {
                    updateToken(data.accessToken)
                } else {
                    console.log(data.mensaje)
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [])

    return (
        <tokenContext.Provider value={{ token, updateToken, loading }}>
            {children}
        </tokenContext.Provider>
    )
}


export const useToken = () => {
    const valor = useContext(tokenContext)
    return valor
}

export default TokenProvider