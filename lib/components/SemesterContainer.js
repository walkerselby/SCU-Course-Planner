import React, { useContext, useEffect, useState } from "react"
import { styled } from "../../stitches.config"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import AlignItems from "../alignment/AlignItems"
import Button from "../button/Button"
import { BiPlus } from "react-icons/bi"
import Dialog from "./Dialog"
import { CourseListContext, DataContext } from "../Context"
import Stack from "../alignment/Stack"
import Course from "./Course"
import Input from "./Input"

const SemesterContainerStyled = styled("div",{
  border:"1px solid $gray4",
  boxShadow:"$2",
  borderRadius:"$2",
  padding:"$2",
  backgroundColor:"white",
  height:"fit-content",
  minWidth:"200px"
})

const SemesterContainerHeaderStyled = styled("div",{
  "h3":{
    margin:"$1 $2"
  },
  "span":{
    fontSize:"$1",
    margin:"$1 $2",
  },
})

const SemesterContainerContentStyled = styled("div",{
  display:"grid",
  gridTemplateColumns:"1fr",
  gap:"$1"
})

const NothingStyled = styled("div",{
  "p":{
    fontSize:"$1",
    color:"$gray10"
  }
})

export function Nothing() {
  return (
    <NothingStyled>
      <AlignItems
        justifyContent={"center"}
        margin={"$3"}
      >
        <p>No Courses</p>
      </AlignItems>
    </NothingStyled>
  )
}

export default function SemesterContainer(props) {
  const [parent] = useAutoAnimate();

  const {plannerData, setPlannerData} = useContext(DataContext);
  const [semesterData, setSemesterData] = useState(plannerData[props.currentYearIndex]?.quarters[props.currentQuarterIndex]?.course);

  const {courseListData, setCourseListData} = useContext(CourseListContext)

  let totalUnits = semesterData.reduce((total, course) => {return total + course.Units}, 0);

  const [filterValue, setFilterValue] = useState();
  
  let filteredArray = courseListData.filter(item => {
    if (item["Quarter Offered"]?.find(element => element == props.semester)) {
      return true
    }
  }).filter(item => {
    if (!filterValue) return true
    if (item["Department"].includes(filterValue) || item["Class Number"].includes(filterValue)) {
      return true
    }
  })

  const pushToMasterData = (courseData) =>{
    plannerData[props.currentYearIndex]?.quarters[props.currentQuarterIndex]?.course.push(courseData);
    setPlannerData(plannerData);
  }

  const removeFromMasterData = (courseData) =>{
    plannerData[props.currentYearIndex]?.quarters[props.currentQuarterIndex]?.course.splice(semesterData.indexOf(courseData),1);
    setPlannerData(plannerData);
  }

  useEffect(()=>{
    console.log(plannerData)
  },[plannerData])

  return (
    <SemesterContainerStyled>
      <SemesterContainerHeaderStyled>
        <AlignItems        
          justifyContent={"space-between"}
          margin={"0 0 $1 0"}
        >
          <h3>{props.semester}</h3>
          {totalUnits > 0 && <span>{totalUnits} unit</span>}
        </AlignItems>
      </SemesterContainerHeaderStyled>
      <SemesterContainerContentStyled
        ref={parent}
      >
        {semesterData.map(courseData => 
          <Course
            data={courseData}
            removeCourse={()=>{
              setCourseListData([
                ...courseListData,
                courseData
              ]);
              setSemesterData(oldValues => {
                return oldValues.filter(fruit => fruit !== courseData)
              });
              removeFromMasterData(courseData)
            }}
          />
        )}
        {semesterData.length <= 0 && <Nothing/>}
        <Dialog
          topLeftComponent={
            <Input
              placeholder={"Course Name or Number"} 
              type="text"
              value={filterValue} 
              onChange={e => setFilterValue(e.target.value)} 
            />
          }
          topRightComponent={<span>{filteredArray.length} Displayed</span>}
          trigger={
            <Button icon={<BiPlus/>}>
              Add Course
            </Button>
          }
        >
          <Stack
            gap={"0.25em"}
            margin={"1em 0 0 0"}
          >
            {filteredArray.length > 0 ? 
              <>
                {
                  filteredArray.map(courseData => {
                    return (
                      <Course
                        data={courseData}
                        addCourse={()=>{
                          setCourseListData(oldValues => {
                            return oldValues.filter(fruit => fruit !== courseData)
                          });
                          setSemesterData(old => [
                            ...old,
                            courseData
                          ]);
                          pushToMasterData(courseData)
                        }}
                      />
                    )
                  })
                }
              </>:
              <Nothing/>
            }
          </Stack>
        </Dialog>
      </SemesterContainerContentStyled>
    </SemesterContainerStyled>
  )
}
