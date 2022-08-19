import "../styles/globals.css"
import { Wrapper } from "../context/state"

export default function Anchor({ Component, pageProps }) {
    return (
        <Wrapper>
            <Component {...pageProps} />
        </Wrapper>
    )
}