import React, {useEffect, useState} from "react"
import Nav from "../lib/components/Nav"
import Button from "../lib/button/Button"
import Stack from "../lib/alignment/Stack"
import {BiBookAlt, BiCog, BiExport, BiLinkExternal, BiSave} from "react-icons/bi"
import {styled} from "../stitches.config"
import SemesterContainer from "../lib/components/SemesterContainer"
import YearContainer from "../lib/components/YearContainer"
import Dialog from "../lib/components/Dialog" 
import emptyDataRaw from "../emptyData.json" 
import {signOut, useSession} from "next-auth/react"
import ProfileButton from "../lib/button/ProfileButton"
import {useRouter} from "next/router"
import { CourseListContext, DataContext } from "../lib/Context" 
import { courseList } from "../data/courseList"
import PDFView from "../lib/PDFView"
import AlignItems from "../lib/alignment/AlignItems" 
import { Selector } from "../lib/components/Selector"
import Course from "../lib/components/Course"
import Nothing from "../lib/components/SemesterContainer"

const DashboardBody = styled("div", {
  display: "flex",
  justifyContent: "space-between",
})

const DashboardMain = styled("main", {
  width: "100%",
  margin: "$1 7%"
})

const Container = styled("div",{
  border:"1px solid $gray4",
  background:"linear-gradient(45deg,$scuPrimary,$red8)",
  boxShadow:"$1",
  padding:"$2",
  borderRadius:"$3",
  color:"white",
  cursor:"pointer",
  transition:"0.5s",
  "h4":{
    margin:"0"
  },
  "p":{
    margin:"0",
    fontSize:"$1"
  },
  "&:hover":{
    transform:"rotate(-2deg) scale(1.05)",
  }
})

export default function dashboard() {
  const router = useRouter();
  const [courseListData, setCourseListData] = useState(courseList);

  // const dataPacks = { blank:emptyDataRaw , cse:dummyDataRaw};
  const [plannerData, setPlannerData] = useState(emptyDataRaw);
  const [filterListSelect, setFilterListSelect] = useState("Fall");
  
  const {data: session, status} = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session])

  useEffect(() => {
    console.log(plannerData)
  }, [plannerData]);


  let filteredCourseList = filterListSelect !== "All" && courseListData.filter(item => {
    if (item["Quarter Offered"]?.find(element => element == filterListSelect)) {
      return true
    }
  })

  return (
    <>
      {
        session &&
        <CourseListContext.Provider
          value={{courseListData,setCourseListData}}
        >
          <DataContext.Provider
            value={{plannerData,setPlannerData}}
          >
            <DashboardBody>
              <Nav
                topPortion={
                  <Stack gap={"0.5em"}>
                    <h2>SCU Course Planner</h2>
                    <Dialog
                      title={"Export as PDF"}
                      trigger={
                        <Button
                          color={"black"}
                          icon={<BiSave/>}
                        >
                          Save as PDF
                        </Button>
                      }
                    >
                      <PDFView plannerData={plannerData}/>
                    </Dialog>
                    <Dialog
                      topLeftComponent={
                        <Selector
                          value={filterListSelect}
                          onValueChange={setFilterListSelect}
                        >
                          <Selector.Item
                            value={"All"}
                          >
                            All Quarters
                          </Selector.Item>
                          <Selector.Hr />
                          <Selector.Group>
                            <Selector.Label>Quarters</Selector.Label>
                            <Selector.Item
                              value={"Fall"}
                            >
                              Fall Quarter
                            </Selector.Item>
                            <Selector.Item
                              value={"Winter"}
                            >
                              Winter Quarter
                            </Selector.Item>
                            <Selector.Item
                              value={"Spring"}
                            >
                              Spring Quarter
                            </Selector.Item>
                          </Selector.Group>
                        </Selector>
                      }
                      topRightComponent={
                        filterListSelect !== "All" && 
                        filteredCourseList.length > 0 && <span>
                          {filteredCourseList.length} Found
                        </span>
                      }
                      trigger={
                        <Button
                          icon={<BiBookAlt/>}
                        >
                          View Full List
                        </Button>
                      }
                    >
                      <Stack
                        gap={"0.25em"}
                        margin={"1em 0 0 0"}
                      >
                        {
                          filterListSelect == "All" ?
                          <>
                            {
                              courseList.map(courseData => {
                                return <Course
                                  data={courseData}
                                />
                              })
                            }
                          </>
                          :<>
                            {
                              filteredCourseList.length > 0 ?
                              <>
                                {
                                  filteredCourseList.map(courseData => {
                                    return <Course
                                      data={courseData}
                                    />
                                  })
                                }
                              </>:
                              <Nothing/>
                            }
                          </>
                        }
                      </Stack>
                    </Dialog>
                    <Dialog
                      title={"Settings"}
                      trigger={
                        <Button
                          icon={<BiCog/>}
                        >
                          Settings
                        </Button>
                      }
                    >
                      <AlignItems justifyContent={"space-between"}>
                        <p>
                          Prepopulate with example schedule
                        </p>
                      </AlignItems>
                    </Dialog>
                  </Stack>
                }
              >
                <Stack gap={"0.5em"}>
                  <Container>
                    <Stack gap={"1em"}>
                      <Stack gap={"0.5em"}>
                        <h4>Check this!</h4>
                        <p>
                          Create a more detailed schedule using bettercourseavail.
                        </p>
                      </Stack>
                      <Button
                        color={"white"}
                        icon={<BiLinkExternal/>}
                        onClick={()=>router.push("https://bettercourseavail.com/")}
                      >
                        bettercourseavail
                      </Button>
                    </Stack>
                  </Container>
                  <ProfileButton
                    name={session.user.name}
                    email={session.user.email}
                    src={session.user.image}
                  >
                    <Button
                      color={"black"}
                      onClick={signOut}
                    >
                      Sign Out
                    </Button>
                  </ProfileButton>
                </Stack>
              </Nav>
              <DashboardMain>
                {plannerData?.map((data) => {
                  return (
                    <YearContainer title={data.year}>
                      {data.quarters?.map(quarter => {
                        return (
                          <SemesterContainer
                            semester={quarter.semester}
                            currentYearIndex={plannerData?.indexOf(data)}
                            currentQuarterIndex={data.quarters?.indexOf(quarter)}
                          />
                        )
                      })}
                    </YearContainer>
                  )
                })}
              </DashboardMain>
            </DashboardBody>
          </DataContext.Provider>
        </CourseListContext.Provider>
      }
    </>
  )
}
