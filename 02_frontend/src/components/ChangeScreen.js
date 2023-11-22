import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { useState } from 'react'
import BackButton from '../common/BackButton'
import { fetchDates, getDateClasstimeObj } from '../methods/initProcess'
import { useNavigate } from 'react-router-dom'
import { updateDateToServer } from '../methods/requestProcess'
import { getClassRoomId } from '../methods/commonProcess'

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

  // Todo : 共通処理にする //////////////////////////////
  const handleDateChange = (event, cnt) => {
    const newChangeDate = [...beforeDate]
    if(newChangeDate.length === cnt){
      newChangeDate.push(event.target.value)
    }else{
      newChangeDate[cnt] = event.target.value
    }
    setBeforeDate(newChangeDate)
  }

  const handleAfterDateChange = (event, cnt) => {
    const newAfterDate = [...afterDate]
    if(newAfterDate.length === cnt){
      newAfterDate.push(event.target.value)
    }else{
      newAfterDate[cnt] = event.target.value
    }
    setAfterDate(newAfterDate)
  }

  const handleKomaChange = (event, cnt) => {
    const newChangeKoma = [...beforeKoma]
    if(newChangeKoma.length === cnt){
      newChangeKoma.push(event.target.value)
    }else{
      newChangeKoma[cnt] = event.target.value
    }
    setBeforeKoma(newChangeKoma)
  }

  const handleAfterKomaChange = (event, cnt) => {
    console.log(event.target.value)
    const newAfterKoma = [...afterKoma]
    if(newAfterKoma.length === cnt){
      newAfterKoma.push(event.target.value)
    }else{
      newAfterKoma[cnt] = event.target.value
    }
    setAfterKoma(newAfterKoma)
  }
  /////////////////////////////////////////////////////

  // Todo : delete にもあるので共通処理にする
  const handleFormAdd = () => {
    const newFormCnt = [...formCnt]
    newFormCnt.push(newFormCnt.length)
    setFormCnt(newFormCnt)
  }
  ////////////////////////////////////////////////

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
    // Todo 変更画面と似ているため、コンポーネント化する
    <Grid container spacing={2} width="80%" margin="auto">
      {
      formCnt.map((cnt) => (
        <>
          <Grid item xs={5} >
            <Paper style={{ width: '100%', padding: '2%', marginTop: '2%' }} key={cnt} >
              <p>変更前日時</p>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <InputLabel id="delete-dates">来塾日</InputLabel>
                  <Select
                    labelId="delete-dates"
                    id="delete-date"
                    value={beforeDate[cnt]}
                    label="date"
                    onChange={(event) => handleDateChange(event, cnt)}
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
                  <InputLabel id="delete-komas">コマ</InputLabel>
                  <Select
                    labelId="delete-komas"
                    id="delete-koma"
                    label="koma"
                    onChange={(event) => handleKomaChange(event, cnt)}
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
                  <InputLabel id="delete-dates">来塾日</InputLabel>
                  <Select
                    labelId="delete-dates"
                    id="delete-date"
                    value={afterDate[cnt]}
                    label="date"
                    onChange={(event) => handleAfterDateChange(event, cnt)}
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
                  <InputLabel id="delete-komas">コマ</InputLabel>
                  <Select
                    labelId="delete-komas"
                    id="delete-koma"
                    label="koma"
                    onChange={(event) => handleAfterKomaChange(event, cnt)}
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
        <Box flexDirection="row" justifyContent="flex-end" display="flex">
          <Button variant="contained" color="primary" onClick={handleUpdate}>登録</Button>
        </Box>
      </Grid>
      <Grid item xs={1} marginTop="1%" alignItems="right" marginBottom="2%">
        <Box flexDirection="row" justifyContent="flex-end" display="flex">
          <Button variant="contained" color="success" onClick={handleFormAdd}>追加</Button>
        </Box>
      </Grid>
      <Grid item xs={1} marginTop="1%" alignItems="right" marginBottom="2%">
        <BackButton />
      </Grid>
    </Grid>
  )
}
