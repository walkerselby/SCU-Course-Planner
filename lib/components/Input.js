import React from "react"
import { styled } from "../../stitches.config"

const InputStyled = styled("input",{
  backgroundColor:"$gray2",
  border:"1px solid $gray5",
  padding:"$1",
  borderRadius:"$1",
  outline:"none",
  minWidth:"200px"
})

export default function Input({...props}) {
  return (
    <InputStyled
      {...props}
    />
  )
}
