import React from "react"
import { styled } from "../../stitches.config"
import Dialog from "../components/Dialog" 
import Stack from "../alignment/Stack"

const ProfileButtonStyled = styled("div",{
  cursor:"pointer",
  fontWeight:"medium",
  borderRadius:"$3",
  padding:"$1 $2",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  gap:"$1",
  border:"1px solid transparent",
  color:"black",
  "img":{
    borderRadius:"$4",
    border:"1px solid $gray3"
  },
  "span":{
    fontSize:"$2",
  },
  "&:hover":{
    backgroundColor:"$gray4",
    borderColor:"$gray6",
  },
})

export default function ProfileButton(props) {
  return (
    <Dialog
      title={"Profile Info"}
      trigger={
        <ProfileButtonStyled
          onClick={props.onClick}
        >
          <img
            src={props.src}
            alt={"Profile Image"}
            width={20}
            height={20}
          />
          <span>
            {props.name}
          </span>
        </ProfileButtonStyled>
      }
    >
      <p>Name: {props.name}</p>
      <p>Registered Email: {props.email}</p>
      <Stack
        margin={"2em 0 0 0"}
      >
        {props.children}
      </Stack>
    </Dialog>
  )
}
