import { FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import React, { useState } from 'react'
import BackButton from '../common/BackButton'
import { fetchDates, getDateClasstimeObj } from '../methods/initProcess'
import { useNavigate } from 'react-router-dom'
import { deleteDateToServer } from '../methods/requestProcess'
import { getClassRoomId, handleSelectBoxChange } from '../methods/commonProcess'
import FormAddButton from '../common/FormAddButton'
import BusinessImplButton from '../common/BusinessImplButton'

export default function DeleteScreen() {
  const [formCnt, setFormCnt] = useState([0])
  
  const [delDate, setDelDate] = useState([])
  const [delKoma, setDelKoma] = useState([])

  const [comeDateKomaTable, setComeDateKomaTable] = useState({})
  const [comeDateList, setComeDateList] = useState([])
  
  const [comeDatesResponse, setComeDatesResponse] = useState({})
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
  }, [])


  const handleDelete = () => {
    const deleteClassIds = []
    for(let i=0; i < delDate.length; i++){
      let delClassId = getClassRoomId(comeDatesResponse, delDate[i], delKoma[i])
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
                onChange={(event) => handleSelectBoxChange(event, cnt, delDate, setDelDate)}
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
                onChange={(event) => handleSelectBoxChange(event, cnt, delKoma, setDelKoma)}
              >
                {
                  comeDateKomaTable[delDate[cnt]] ?
                    comeDateKomaTable[delDate[cnt]].map((koma) => (
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
        <BusinessImplButton businessFunction={handleDelete} buttonStr="削除"/>
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
