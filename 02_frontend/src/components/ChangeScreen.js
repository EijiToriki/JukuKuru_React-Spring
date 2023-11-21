import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { useState } from 'react'
import BackButton from '../common/BackButton'
import { fetchExistStudentDates, fetchStudentDates, getDateClasstimeObj } from '../methods/initProcess'
import { useNavigate } from 'react-router-dom'
import { updateDateToServer } from '../methods/requestProcess'
import { getClassRoomId } from '../methods/commonProcess'

export default function ChangeScreen() {
  // Todo : 状態変数の命名規則 決める
  const [formCnt, setFormCnt] = useState([0])
  const [changeDate, setChangeDate] = useState([])
  const [changeKoma, setChangeKoma] = useState([])
  const [afterDate, setAfterDate] = useState([])
  const [afterKoma, setAfterKoma] = useState([])

  const [studentDatesObj, setStudentDatesObj] = useState({})
  const [studentDatesOnly, setStudentDatesOnly] = useState([])
  const [existStudentDatesObj, setExistStudentDatesObj] = useState({})
  const [existStudentDatesOnly, setExistStudentDatesOnly] = useState([])
  const [classDatesResponse, setClassDatesResponse] = useState({})
  const [existDateResponse, setExsitDateResponse] = useState({})
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchStudentDates().then(studentDates => {
      setClassDatesResponse(studentDates)
      const studentDatesObj = getDateClasstimeObj(studentDates)
      setStudentDatesObj(studentDatesObj)

      const dateList = []
      for(const studentDate in studentDatesObj){
        dateList.push(studentDate)
      }
      setStudentDatesOnly(
        dateList.sort(function(a, b) {
          return a.localeCompare(b)
        })
      )
    })

    fetchExistStudentDates().then(existDates => {
      setExsitDateResponse(existDates)
      const existStudentDatesObj = getDateClasstimeObj(existDates)
      setExistStudentDatesObj(existStudentDatesObj)

      const dateList = []
      for(const existDate in existStudentDatesObj){
        dateList.push(existDate)
      }
      setExistStudentDatesOnly(
        dateList.sort(function(a, b) {
          return a.localeCompare(b)
        })
      )
    })
  }, [])

  const handleDateChange = (event, cnt) => {
    const newChangeDate = [...changeDate]
    if(newChangeDate.length === cnt){
      newChangeDate.push(event.target.value)
    }else{
      newChangeDate[cnt] = event.target.value
    }
    setChangeDate(newChangeDate)
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
    const newChangeKoma = [...changeKoma]
    if(newChangeKoma.length === cnt){
      newChangeKoma.push(event.target.value)
    }else{
      newChangeKoma[cnt] = event.target.value
    }
    setChangeKoma(newChangeKoma)
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

  const handleFormAdd = () => {
    const newFormCnt = [...formCnt]
    newFormCnt.push(newFormCnt.length)
    setFormCnt(newFormCnt)
  }

  const handleUpdate = () => {
    const beforeClassIds = []
    for(let i=0; i < changeDate.length; i++){
      let delClassId = getClassRoomId(classDatesResponse, changeDate[i], changeKoma[i])
      beforeClassIds.push(delClassId)
    }

    const afterClassIds = []
    for(let i=0; i < changeDate.length; i++){
      let delClassId = getClassRoomId(existDateResponse, afterDate[i], afterKoma[i])
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
                    value={changeDate[cnt]}
                    label="date"
                    onChange={(event) => handleDateChange(event, cnt)}
                  >
                    {
                    studentDatesOnly.map((studentDate) => (
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
                      studentDatesObj[changeDate[cnt]] ?
                        studentDatesObj[changeDate[cnt]].map((koma) => (
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
                    existStudentDatesOnly.map((studentDate) => (
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
                      existStudentDatesObj[afterDate[cnt]] ?
                      existStudentDatesObj[afterDate[cnt]].map((koma) => (
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
