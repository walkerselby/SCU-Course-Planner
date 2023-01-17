import React from "react"
import { styled } from "../../stitches.config"
import AlignItems from "../alignment/AlignItems"
import Dialog from "./Dialog";
import { BiDotsVerticalRounded, BiPlus, BiTrash } from "react-icons/bi";
import Button from "../button/Button";
import { courseColor } from "../../data/courseColor";
import Stack from "../alignment/Stack";

const CourseStyled = styled("div",{
  cursor:"pointer",
  userSelect:"none",
  border:"1px solid $gray4",
  borderRadius:"$1",
  padding:"$2",
  color:"$gray10",
  "h4":{
    margin:"0",
    color:"black"
  },
  "p":{
    fontSize:"$1",
    margin:"0"
  },
  "span":{
    fontSize:"$1",
  },
  "&:hover":{
    borderColor:"$gray7",
  }
})

const SemesterTagStyled = styled("div",{
  backgroundColor:"$gray1",
  border:"1px solid $gray5",
  padding:"0.25em 0.5em",
  borderRadius:"$1",
  fontSize:"$1"
})

const TypeStyled = styled("div",{
  height:"100%"
})

function QuarterOffered({quarterData}){
  return (
    <AlignItems
      gap={"0.25em"}
      // margin={"0.5em 0 0 0"}
    >
      {quarterData.map(data =>
        <SemesterTagStyled>
          {data}
        </SemesterTagStyled>
      )}
    </AlignItems>
  )  
}

export default function Course(props) {
  let courseData = props.data;
  let courseName = courseData["Department"];
  
  return (
    <CourseStyled
      css={{
        background:`linear-gradient(90deg,$${courseColor[courseName]}8 1.5%, $gray3 0%)`
      }}
    >
      <AlignItems
        justifyContent={"space-between"}
        margin={"0 0 $1 0"}
      >
        <AlignItems>
          <h4>{courseName + " " + courseData["Class Number"]}</h4>
          <span>{courseData.Units} unit</span>
        </AlignItems>
        <AlignItems>
          <Dialog
            title={"Course Details"}
            trigger={
              <Button
                size={"smallIcon"}
                icon={<BiDotsVerticalRounded/>}
              />
            }
          >
            <Stack>
              <Stack
                gap={"1em"}
                margin={"0 0 1.5em 0"}
              >
                <span>Department: {courseName}</span>
                <span>Class Number: {courseData["Class Number"]}</span>
                <AlignItems margin={"0"}>
                  <span>Quarter Offered:</span>
                  <QuarterOffered
                    quarterData={courseData["Quarter Offered"]}
                  />
                </AlignItems>
              </Stack>
              {
                props.removeCourse &&
                <Button
                  icon={<BiTrash/>}
                  color={"black"}
                  onClick={props.removeCourse}
                >
                  Remove Course
                </Button>
              }
            </Stack>
          </Dialog>
          {
            props.addCourse &&
            <Button
              size={"smallIcon"}
              icon={<BiPlus/>}
              color={"black"}
              onClick={props.addCourse}
            />
          }
        </AlignItems>
      </AlignItems>
      {courseData["Quarter Offered"]?.length > 0 &&
        <AlignItems>
          <QuarterOffered
            quarterData={courseData["Quarter Offered"]}
          />
        </AlignItems>
      }
    </CourseStyled>
  )
}
