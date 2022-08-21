import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Context = createContext()

export function Wrapper({ children }) {

    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    async function updateSession() {
        const { data: { session }, error } = await supabase.auth.getSession()
        setSession(session)
    }

    useEffect(() => {
        supabase.auth.onAuthStateChange((_, session) => {
            setLoading(true)
            setSession(session)
        })
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [session])

    updateSession()

    return <Context.Provider value={{
        session,
        loading
    }}>{children}</Context.Provider>

}

export function useAppContext() {
    return useContext(Context)
}