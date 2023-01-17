import React from "react"
import { styled } from "../../stitches.config"

const StackStyled = styled("div",{
  display:"grid",
  gridTemplateColumns:"1fr"
})

export default function Stack(props) {
  return (
    <StackStyled
      css={{
        gap:props.gap,
        margin:props.margin
      }}
      ref={props.ref}
    >
      {props.children}
    </StackStyled>
  )
}
