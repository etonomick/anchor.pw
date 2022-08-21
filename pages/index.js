import { useState } from "react"
import Input from "../components/Input"
import { useAppContext } from "../context/state"
import { supabase } from "../utils/supabaseClient"

export default function Index() {

    const { session, loading } = useAppContext()

    const [input, updateInput] = useState({
        value: "",
        focused: false,
        emailSent: false,
        error: null
    })


    function handleInput(e) {
        updateInput({ ...input, ["value"]: e.target.value.replace(/[^A-Za-z]/g, "").slice(0, 15).toLowerCase() })
    }

    function handleEmailInput(e) {
        updateInput({ ...input, ["value"]: e.target.value })
    }

    async function signIn() {
        const { user, error } = await supabase.auth.signInWithOtp({
            email: input.value
        })
        if (error) {
            updateInput({ ...input, ["error"]: error.message })
            return
        }
        if (user) {
            updateInput({ ...input, ["emailSent"]: true, ["error"]: null })
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">Loaidng...</div>
    )

    return (
        <div className="min-h-screen flex flex-col justify-center gap-8 p-12">
            <div className="container mx-auto max-w-4xl flex flex-col gap-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl">
                    {/* {session && <>Hello</>} */}
                    <span className="font-black">Meet Anchor.</span> One simple page for all your <span className="">links</span>
                </h1>
                <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-800">Enter your email and we'll send you magic link.</p>
                <Input
                    placeholder={session && "anchor.pw/"}
                    input={input}
                    onChange={!session ? handleEmailInput : handleInput}
                    onClick={() => signIn()} />
            </div>
        </div>
    )
}
