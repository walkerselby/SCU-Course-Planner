import React from "react"
import { styled } from "../../stitches.config"

const ButtonStyled = styled("button",{
  cursor:"pointer",
  userSelect:"none",
  fontWeight:"medium",
  borderRadius:"$1",
  padding:"$1 $2",
  border:"1px solid",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  gap:"$1",
  transition:"0.25s",
  "&:hover":{
    opacity:"0.6",
    transform:"scale(1.03)"
  },
  variants:{
    color:{
      red:{
        background:"linear-gradient(45deg,$scuPrimary,$scuSecondary)",
        borderColor:"$scuPrimary",
        color:"white",
        boxShadow:"$1",
      },
      white:{
        backgroundColor:"white",
        borderColor:"$gray2",
        color:"black",
      },
      gray:{
        backgroundColor:"$gray4",
        borderColor:"$gray7",
        color:"black",
      },
      black:{
        background:"linear-gradient(45deg,$gray12,black)",
        borderColor:"$gray12",
        color:"white",
      }
    },
    size:{
      icon:{
        // width:"35px",
        // height:"35px",
        padding:"$1",
        borderRadius:"$4",
        fontSize:"$3",
        "span":{
          display:"none",
        },
      },
      smallIcon:{
        padding:"calc($1/2)",
        borderRadius:"$1",
        fontSize:"$2",
        "span":{
          display:"none",
        },
      }
    },
  },
  defaultVariants:{
    color:"gray"
  }
})

export default function Button(props) {
  return (
    <ButtonStyled
      onClick={props.onClick}
      color={props.color}
      size={props.size}
    >
      {props.icon}
      <span>
        {props.children}
      </span>
    </ButtonStyled>
  )
}
