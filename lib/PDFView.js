import React from "react"
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer"; 
import { courseColor } from "../data/courseColor";

// Create styles
const styles = StyleSheet.create({
  pdfViewer:{
    width:"100%",
    border:"1px solid gray",
    borderRadius:"7px",
    height:"500px"
  },
  page: {
    display:"flex",
    flexDirection:"column",
    backgroundColor: "white",
    padding:"15px"
  },
  h1:{
    fontSize:"25px",
  },
  header:{
    padding:"10px",
    textAlign:"center"
  },
  yearSection: {
    borderBottom:"1px solid lightgray",
    marginBottom:"10px"
  },
  quarterSection:{
    display:"flex",
    // alignItems:"center",
    flexDirection:"row",
    justifyContent:"space-between",
    // gridTemplateColumns:"1fr 1fr 1fr",
    // backgroundColor:"blue",
  },
  semesterSection:{
    // border:"1px solid black",
    padding:"5px",
    width:"200px"
  },
});

export default function PDFView({plannerData}) {
  return (
    <>
      <PDFViewer style={styles.pdfViewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.h1}>My 4 Year Course Plan</Text>
              <Text>Created using the SCU Course Planner</Text>
            </View>
            {
              plannerData.map(yearObj =>{
                return <View style={styles.yearSection}>
                  <Text>{yearObj.year}</Text>
                  <View style={styles.quarterSection}>
                    {
                      yearObj.quarters?.map(quarterObj =>{
                        return <View style={styles.semesterSection}>
                          <Text
                            style={{
                              fontSize:"10px",
                              color:"gray"
                            }}
                          >
                            {quarterObj.semester}
                          </Text>
                          {quarterObj.course.map(courseObj =>{
                            return (
                              <View
                                style={{
                                  padding:"5px",
                                  fontSize:"12px",
                                  borderLeft:`3px solid ${courseColor[courseObj["Department"]]}`
                                }}
                              >
                                <Text>
                                  {courseObj["Department"] + " " + courseObj["Class Number"]}
                                </Text>
                              </View>
                            )
                          })}
                        </View>
                      })
                    }
                  </View>
                </View>
              })
            }
          </Page>
        </Document>
      </PDFViewer>
    </>
  )
}
