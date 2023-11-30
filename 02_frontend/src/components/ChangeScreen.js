import { Alert, Grid } from '@mui/material'
import React, { useState } from 'react'
import BackButton from '../common/BackButton'
import { fetchDates, getDateClasstimeObj } from '../methods/initProcess'
import { useNavigate } from 'react-router-dom'
import { updateDateToServer } from '../methods/requestProcess'
import { errorCheck, getClassRoomId } from '../methods/commonProcess'
import FormAddButton from '../common/FormAddButton'
import BusinessImplButton from '../common/BusinessImplButton'
import FormArea from '../common/FormArea'

export default function ChangeScreen() {
  const [errorFlag, setErrorFlag] = useState(false)
  const [formCnt, setFormCnt] = useState([0])
  const [beforeDate, setBeforeDate] = useState([])
  const [beforeKoma, setBeforeKoma] = useState([])
  const [afterDate, setAfterDate] = useState([])
  const [afterKoma, setAfterKoma] = useState([])

  const [comeDateKomaTable, setComeDateKomaTable] = useState({})
  const [comeDateList, setComeDateList] = useState([])

  const [selectableDateKomaTable, setSelectableDateKomaTable] = useState({})
  const [selectableDateList, setSelectableDateList] = useState([])
  
  const [comeDatesResponse, setComeDatesResponse] = useState({})
  const [selectableDatesResponse, setSelectableDatesResponse] = useState({})

  const navigate = useNavigate()

  const studentId = localStorage.getItem("studentId")
  const classroomId = localStorage.getItem("classroomId")

  React.useEffect(() => {
    const getComeDateParams = {
      studentId: studentId
    }
    fetchDates(getComeDateParams, "getComeDate").then(studentDates => {
      setComeDatesResponse(studentDates)
      const comeDateKomaTable = getDateClasstimeObj(studentDates)
      setComeDateKomaTable(comeDateKomaTable)

      const dateList = []
      for(const studentDate in comeDateKomaTable){
        dateList.push(studentDate)
      }
      setComeDateList(
        dateList.sort(function(a, b) {
          return a.localeCompare(b)
        })
      )
    })

    const getOptionalDateparams = {
      studentId: studentId,
      classroomId: classroomId
    }
    fetchDates(getOptionalDateparams, "getOptionalDate").then(existDates => {
      setSelectableDatesResponse(existDates)
      const selectableDateKomaTable = getDateClasstimeObj(existDates)
      setSelectableDateKomaTable(selectableDateKomaTable)

      const dateList = []
      for(const existDate in selectableDateKomaTable){
        dateList.push(existDate)
      }
      setSelectableDateList(
        dateList.sort(function(a, b) {
          return a.localeCompare(b)
        })
      )
    })
  }, [])

  const handleUpdate = () => {
    const beforeClassIds = []
    for(let i=0; i < beforeDate.length; i++){
      let delClassId = getClassRoomId(comeDatesResponse, beforeDate[i], beforeKoma[i])
      beforeClassIds.push(delClassId)
    }

    const afterClassIds = []
    for(let i=0; i < beforeDate.length; i++){
      let delClassId = getClassRoomId(selectableDatesResponse, afterDate[i], afterKoma[i])
      afterClassIds.push(delClassId)
    }


    if(errorCheck(beforeDate, beforeKoma) && errorCheck(afterDate, afterKoma) && beforeDate.length === afterDate.length){
      updateDateToServer(studentId, beforeClassIds, afterClassIds)
      setErrorFlag(false)
      navigate("/menu")  
    }else{
      setErrorFlag(true)
    }
  }

  return (
    <>
      {
      errorFlag ? 
        <Alert severity="error" onClose={() => {setErrorFlag(false)}} width='80%'>
          選択した受講日とコマを確認してください（同じ日時を選択していませんか？ 何も入力せず更新ボタンを押しませんでしたか？ コマを入れ忘れていませんか？）
        </Alert>
      :
        <></>
      }
      <Grid container spacing={2} width="80%" margin="auto">
        {
        formCnt.map((cnt) => (
          <>
            <Grid item xs={5} >
              <FormArea
                cnt={cnt}
                handleDateList={beforeDate}
                setHandleDateList={setBeforeDate}
                handleKomaList={beforeKoma}
                setHandleKomaList={setBeforeKoma}
                masterDateList={comeDateList}
                dateKomaTable={comeDateKomaTable}
              />
            </Grid>

            <Grid item xs={5} marginLeft='2%' >
              <FormArea
                  cnt={cnt}
                  handleDateList={afterDate}
                  setHandleDateList={setAfterDate}
                  handleKomaList={afterKoma}
                  setHandleKomaList={setAfterKoma}
                  masterDateList={selectableDateList}
                  dateKomaTable={selectableDateKomaTable}
                />
            </Grid>
          </>
        ))
        }
        
        <Grid item xs={10} marginTop="1%" alignItems="right" marginBottom="2%">
          <BusinessImplButton businessFunction={handleUpdate} buttonStr="登録"/>
        </Grid>
        <Grid item xs={1} marginTop="1%" alignItems="right" marginBottom="2%">
          <FormAddButton formCnt={formCnt} setFormCnt={setFormCnt} />
        </Grid>
        <Grid item xs={1} marginTop="1%" alignItems="right" marginBottom="2%">
          <BackButton />
        </Grid>
      </Grid>
    </>
  )
}
