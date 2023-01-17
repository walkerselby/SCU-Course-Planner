import { styled } from "../stitches.config";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"

const BackgroundStyled = styled("div",{
  backgroundColor:"$gray1",
  backgroundImage:`radial-gradient($gray7 4%, transparent 4%),radial-gradient($gray7 4%, transparent 4%)`,
  backgroundSize: "60px 60px",
  backgroundPosition: "0 0, 30px 30px"
})

export default function App ({ Component, pageProps }) {
  return (
    <BackgroundStyled>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </BackgroundStyled>
  )
}