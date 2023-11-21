import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { useState } from 'react'
import BackButton from '../common/BackButton'
import { fetchStudentDates, getDateClasstimeObj } from '../methods/initProcess'
import { useNavigate } from 'react-router-dom'
import { deleteDateToServer } from '../methods/requestProcess'
import { getClassRoomId } from '../methods/commonProcess'

export default function DeleteScreen() {
  // Todo : 状態変数の命名規則 決める
  const [formCnt, setFormCnt] = useState([0])
  const [delDate, setDelDate] = useState([])
  const [delKoma, setDelKoma] = useState([])
  const [studentDatesObj, setStudentDatesObj] = useState({})
  const [studentDatesOnly, setStudentDatesOnly] = useState([])
  const [classDatesResponse, setClassDatesResponse] = useState({})
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
  }, [])

  const handleDateChange = (event, cnt) => {
    const newDelDate = [...delDate]
    if(newDelDate.length === cnt){
      newDelDate.push(event.target.value)
    }else{
      newDelDate[cnt] = event.target.value
    }
    setDelDate(newDelDate)
  }

  const handleKomaChange = (event, cnt) => {
    const newDelKoma = [...delKoma]
    if(newDelKoma.length === cnt){
      newDelKoma.push(event.target.value)
    }else{
      newDelKoma[cnt] = event.target.value
    }
    setDelKoma(newDelKoma)
  }

  const handleFormAdd = () => {
    const newFormCnt = [...formCnt]
    newFormCnt.push(newFormCnt.length)
    setFormCnt(newFormCnt)
  }

  const handleDelete = () => {
    const deleteClassIds = []
    for(let i=0; i < delDate.length; i++){
      let delClassId = getClassRoomId(classDatesResponse, delDate[i], delKoma[i])
      deleteClassIds.push(delClassId)
    }
    deleteDateToServer(1, deleteClassIds)
    navigate("/")
  }

  
  return (
    // Todo 変更画面と似ているため、コンポーネント化する
    <Grid container spacing={2} width="80%" margin="auto">
      {
      formCnt.map((cnt) => (
        <Paper style={{ width: '100%', padding: '2%', marginTop: '2%' }} key={cnt} >
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel id="delete-dates">来塾日</InputLabel>
              <Select
                labelId="delete-dates"
                id="delete-date"
                value={delDate[cnt]}
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
                  studentDatesObj[delDate[cnt]] ?
                    studentDatesObj[delDate[cnt]].map((koma) => (
                      <MenuItem value={koma} key={koma}>{koma}</MenuItem>
                    ))
                  :
                  <MenuItem disabled value="来塾日を選択してください">来塾日を選択してください</MenuItem>
                }
              </Select>
            </FormControl>  
          </Grid>
        </Paper>
       ))
      }
      
      <Grid item xs={10} marginTop="1%" alignItems="right" marginBottom="2%">
        <Box flexDirection="row" justifyContent="flex-end" display="flex">
          <Button variant="contained" color="primary" onClick={handleDelete}>登録</Button>
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
