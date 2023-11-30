import { Alert, Grid } from '@mui/material'
import React, { useState } from 'react'
import BackButton from '../common/BackButton'
import { fetchDates, getDateClasstimeObj } from '../methods/initProcess'
import { useNavigate } from 'react-router-dom'
import { deleteDateToServer } from '../methods/requestProcess'
import { errorCheck, getClassRoomId } from '../methods/commonProcess'
import FormAddButton from '../common/FormAddButton'
import BusinessImplButton from '../common/BusinessImplButton'
import FormArea from '../common/FormArea'

export default function DeleteScreen() {
  const [errorFlag, setErrorFlag] = useState(false)
  const [formCnt, setFormCnt] = useState([0])
  
  const [delDate, setDelDate] = useState([])
  const [delKoma, setDelKoma] = useState([])

  const [comeDateKomaTable, setComeDateKomaTable] = useState({})
  const [comeDateList, setComeDateList] = useState([])
  
  const [comeDatesResponse, setComeDatesResponse] = useState({})
  const navigate = useNavigate()

  const studentId = localStorage.getItem("studentId")

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
  }, [])


  const handleDelete = () => {
    const deleteClassIds = []
    for(let i=0; i < delDate.length; i++){
      let delClassId = getClassRoomId(comeDatesResponse, delDate[i], delKoma[i])
      deleteClassIds.push(delClassId)
    }

    if(errorCheck(delDate, delKoma)){
      deleteDateToServer(studentId, deleteClassIds)
      setErrorFlag(false)
      navigate("/menu")
    }else{
      setErrorFlag(true)
    }
  }

  
  return (
    // Todo 変更画面と似ているため、コンポーネント化する
    <>
      {
      errorFlag ? 
        <Alert severity="error" onClose={() => {setErrorFlag(false)}} width='80%'>
          選択した受講日とコマを確認してください（同じ日時を選択していませんか？ 何も入力せず削除ボタンを押しませんでしたか？ コマを入れ忘れていませんか？）
        </Alert>
      :
        <></>
      }

      <Grid container spacing={2} width="80%" margin="auto">
        {
        formCnt.map((cnt) => (
          <FormArea
            cnt={cnt}
            handleDateList={delDate}
            setHandleDateList={setDelDate}
            handleKomaList={delKoma}
            setHandleKomaList={setDelKoma}
            masterDateList={comeDateList}
            dateKomaTable={comeDateKomaTable}
          />
        ))
        }
        <Grid item xs={10} marginTop="1%" alignItems="right" marginBottom="2%">
          <BusinessImplButton businessFunction={handleDelete} buttonStr="削除"/>
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
