import React from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { handleSelectBoxChange } from '../methods/commonProcess'

export default function FormArea({cnt, handleDateList, setHandleDateList, handleKomaList, setHandleKomaList, masterDateList, dateKomaTable}) {
  return (
    <Paper style={{ width: '100%', padding: '2%', marginTop: '2%' }} key={cnt} >
    <Grid item xs={10}>
      <FormControl fullWidth>
        <InputLabel id="delete-dates">来塾日</InputLabel>
        <Select
          labelId="delete-dates"
          id="delete-date"
          value={handleDateList[cnt]}
          label="date"
          onChange={(event) => handleSelectBoxChange(event, cnt, handleDateList, setHandleDateList)}
        >
          {
          masterDateList.map((masterDate) => (
            <MenuItem value={masterDate} key={masterDate}>{masterDate}</MenuItem>
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
          onChange={(event) => handleSelectBoxChange(event, cnt, handleKomaList, setHandleKomaList)}
        >
          {
            dateKomaTable[handleDateList[cnt]] ?
              dateKomaTable[handleDateList[cnt]].map((koma) => (
                <MenuItem value={koma} key={koma}>{koma}</MenuItem>
              ))
            :
            <MenuItem disabled value="来塾日を選択してください">来塾日を選択してください</MenuItem>
          }
        </Select>
      </FormControl>  
    </Grid>
  </Paper>
  )
}
