import React from "react"
import { styled } from "../../stitches.config"

const AlignItemsStyled = styled("div",{
  display:"flex",
})

export default function AlignItems(props) {
  return (
    <AlignItemsStyled
      css={{
        justifyContent:props.justifyContent,
        alignItems:props.alignItems ? props.alignItems:"center",
        flexDirection:props.flexDirection ? props.flexDirection:"row",
        margin:props.margin,
        gap:props.gap ? props.gap:"$1",
      }}
    >
      {props.children}
    </AlignItemsStyled>
  )
}
