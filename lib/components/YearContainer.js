import React,{useState} from "react"
import { styled } from "../../stitches.config"
import AlignItems from "../alignment/AlignItems" 

const YearContainerStyled = styled("section",{
  "h1":{
    fontSize:"3em",
    color:"$gray7",
    marginBottom:"0"
  },
  marginBottom:"$4",
})

const YearContainerContentStyled = styled("div",{
  display:"grid",
  gridTemplateColumns:"1fr 1fr 1fr",
  gap:"$2",
  marginBottom:"$2"
})

export default function YearContainer(props) {
  const [displaySummer, setDisplaySummer] = useState(false);

  return (
    <YearContainerStyled>
      <AlignItems
        alignItems={"end"}
        justifyContent={"right"}
        margin={"0 0 $1 0"}
      >
        {/* <Dialog
          title={`Configure ${props.title}`}
          trigger={
            <Button
              icon={<BiSlider/>}
            >
              Configure
            </Button>
          }
        >
          <Stack>
            <AlignItems justifyContent={"space-between"}>
              <p>Enable summer quarter</p>
              <Button
                icon={<BiShow/>}
                onClick={()=>setDisplaySummer(displaySummer ? false:true)}
              >
                {displaySummer ? "Hide":"Show"}
              </Button>
            </AlignItems>
          </Stack>
        </Dialog> */}
        <h1>{props.title}</h1>
      </AlignItems>
      <YearContainerContentStyled>
        {props.children}
      </YearContainerContentStyled>
      {displaySummer && props.summer}
    </YearContainerStyled>
  )
}
