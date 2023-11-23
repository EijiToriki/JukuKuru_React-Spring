import { FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { useState } from 'react'
import BackButton from '../common/BackButton'
import { fetchDates, getDateClasstimeObj } from '../methods/initProcess'
import { useNavigate } from 'react-router-dom'
import { updateDateToServer } from '../methods/requestProcess'
import { getClassRoomId, handleSelectBoxChange } from '../methods/commonProcess'
import FormAddButton from '../common/FormAddButton'
import BusinessImplButton from '../common/BusinessImplButton'

export default function ChangeScreen() {
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

  React.useEffect(() => {
    const getComeDateParams = {
      studentId: 1
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
      studentId: 1,
      classroomId: 1
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

    updateDateToServer(1, beforeClassIds, afterClassIds)
    navigate("/")
  }

  return (
    // Todo 93～136, 138～181 似ているのでコンポーネント化する
    <Grid container spacing={2} width="80%" margin="auto">
      {
      formCnt.map((cnt) => (
        <>
          <Grid item xs={5} >
            <Paper style={{ width: '100%', padding: '2%', marginTop: '2%' }} key={cnt} >
              <p>変更前日時</p>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <InputLabel id="before-dates">来塾日</InputLabel>
                  <Select
                    labelId="before-dates"
                    id="before-date"
                    value={beforeDate[cnt]}
                    label="date"
                    onChange={(event) => handleSelectBoxChange(event, cnt, beforeDate, setBeforeDate)}
                  >
                    {
                    comeDateList.map((studentDate) => (
                      <MenuItem value={studentDate} key={studentDate}>{studentDate}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>  
              </Grid>

              <Grid item xs={4} marginTop='2%'>
                <FormControl fullWidth>
                  <InputLabel id="before-komas">コマ</InputLabel>
                  <Select
                    labelId="before-komas"
                    id="before-koma"
                    label="koma"
                    onChange={(event) => handleSelectBoxChange(event, cnt, beforeKoma, setBeforeKoma)}
                  >
                    {
                      comeDateKomaTable[beforeDate[cnt]] ?
                        comeDateKomaTable[beforeDate[cnt]].map((koma) => (
                          <MenuItem value={koma} key={koma}>{koma}</MenuItem>
                        ))
                      :
                      <MenuItem disabled value="来塾日を選択してください">来塾日を選択してください</MenuItem>
                    }
                  </Select>
                </FormControl>  
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={5} marginLeft='2%' >
            <Paper style={{ width: '100%', padding: '2%', marginTop: '2%' }} key={cnt} >
              <p>変更後日時</p>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <InputLabel id="after-dates">来塾日</InputLabel>
                  <Select
                    labelId="after-dates"
                    id="after-date"
                    value={afterDate[cnt]}
                    label="date"
                    onChange={(event) => handleSelectBoxChange(event, cnt, afterDate, setAfterDate)}
                  >
                    {
                    selectableDateList.map((studentDate) => (
                      <MenuItem value={studentDate} key={studentDate}>{studentDate}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>  
              </Grid>

              <Grid item xs={4} marginTop='2%'>
                <FormControl fullWidth>
                  <InputLabel id="after-komas">コマ</InputLabel>
                  <Select
                    labelId="after-komas"
                    id="after-koma"
                    label="koma"
                    onChange={(event) => handleSelectBoxChange(event, cnt, afterKoma, setAfterKoma)}
                  >
                    {
                      selectableDateKomaTable[afterDate[cnt]] ?
                      selectableDateKomaTable[afterDate[cnt]].map((koma) => (
                          <MenuItem value={koma} key={koma}>{koma}</MenuItem>
                        ))
                      :
                      <MenuItem disabled value="来塾日を選択してください">来塾日を選択してください</MenuItem>
                    }
                  </Select>
                </FormControl>  
              </Grid>
            </Paper>
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
  )
}
