import React from "react"
import { styled } from "../../stitches.config"

const NavStyled = styled("nav",{
  top:"0",
  left:"0",
  position:"sticky",
  display:"flex",
  justifyContent:"space-between",
  flexDirection:"column",
  backgroundColor:"White",
  minWidth:"250px",
  borderRight:"1px solid $gray4",
  borderRadius:"0 $4 $4 0",
  boxShadow:"$3",
  height:"100vh"
})

const NavContentStyled = styled("section",{
  padding:"$3",
})

export default function Nav(props) {
  return (
    <NavStyled>
      <NavContentStyled>
        {props.topPortion}
      </NavContentStyled>
      <NavContentStyled>
        {props.children}
      </NavContentStyled>
    </NavStyled>
  )
}
