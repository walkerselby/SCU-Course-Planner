import React from "react"
import { styled } from "../../stitches.config"

const CenterAllStyled = styled("section",{
  minHeight:"100vh",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  flexDirection:"column"
})

export default function CenterAll(props) {
  return (
    <CenterAllStyled>
      {props.children}
    </CenterAllStyled>
  )
}
