import { useState } from "react"
import Block from "../components/Block"
import { useAppContext } from "../context/state"
import { supabase } from "../utils/supabaseClient"

export default function Page({ data }) {

    const { session } = useAppContext()

    if (!data) {
        return (
            <div>404</div>
        )
    }

    const { styles } = data

    return (
        <div style={{
            backgroundColor: `#${styles.background_color}`,
            color: `#${styles.text_color}`
        }} className="container max-w-4xl mx-auto min-h-screen">
            
        </div>
    )
}

export async function getStaticPaths() {

    const { data } = await supabase.from("pages").select("slug")

    const paths = data.map(({ slug }) => ({
        params: {
            slug
        }
    }))

    return {
        paths,
        fallback: true
    }

}

export async function getStaticProps({ params }) {

    const { slug } = params

    const { data } = await supabase.from("pages").select("*").eq("slug", slug).single()

    return {
        props: {
            data: data ?? null
        } 
    }

}