import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, IconButton } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import LensIcon from '@mui/icons-material/Lens';
import { useNavigate } from 'react-router-dom';
import { fetchClassRoomDates, getClassRoomPropList, getDateClasstimeObj } from '../methods/initprocess';
import BackButton from '../common/BackButton';

export default function RegisterScreen() {
  const [classDates, setClassDates] = React.useState([])
  const [classDatesResponse, setClassDatesResponse] = useState({})
  const [openDatesObj, setOpenDatesObj] = React.useState({})
  const [komaList, setKomaList] = React.useState([])
  const [selectIcons, setSelectIcons] = React.useState({});
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchClassRoomDates().then(classRoomDates => {
      setClassDatesResponse(classRoomDates)
      const dateList = getClassRoomPropList(classRoomDates, "date")
      setClassDates(
        dateList.sort(function(a, b) {
          return a.localeCompare(b)
        })
      )
  
      const komaList = getClassRoomPropList(classRoomDates, "class_time")
      setKomaList(
        komaList.sort(function(a, b) {
          return a - b;
        })
      )
      
      const openDatesObj = getDateClasstimeObj(classRoomDates)
      setOpenDatesObj(openDatesObj)
    })
  }, [])

  const handleIconClick = (objIdx) => {
    const newSelectIcons = {...selectIcons}
    if (!newSelectIcons[objIdx]) {
      newSelectIcons[objIdx] = true
    }else{
      newSelectIcons[objIdx] = !newSelectIcons[objIdx]
    }
    setSelectIcons(newSelectIcons)
  }

  const getClassRoomId = (date, koma) => {
    for(const classRoomDate of classDatesResponse){
      if(classRoomDate.date === date && classRoomDate.class_time === koma){
        return classRoomDate.id
      }
    }
  }

  const handleRegister = () => {
    navigate("/")
  }

  return (
    <Grid container spacing={2} width="80%" margin="auto">
      <Grid item xs={12} marginTop="2%">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>授業日</TableCell>
                {
                  komaList.map((koma) => (
                    <TableCell align="right" key={koma}>{koma}コマ目</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {classDates.map((date) => (
                <TableRow
                  key={date}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{date}</TableCell>
                  {
                    komaList.map((koma) => (
                      openDatesObj[date] && openDatesObj[date].indexOf(koma) !== -1 ?
                        <TableCell align="right" key={koma}>
                          {selectIcons[getClassRoomId(date, koma)] ?
                            <IconButton onClick={() => handleIconClick(getClassRoomId(date, koma))}>
                              <LensIcon />
                            </IconButton>
                          :
                            <IconButton onClick={() => handleIconClick(getClassRoomId(date, koma))}>
                              <CircleOutlinedIcon />
                            </IconButton>
                          }
                        </TableCell>
                      :
                        <TableCell align="right" key={koma}>休講日</TableCell>
                    ))
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={11} marginTop="1%" alignItems="right" marginBottom="2%">
        <Box flexDirection="row" justifyContent="flex-end" display="flex">
          <Button variant="contained" color="primary" onClick={handleRegister}>登録</Button>
        </Box>
      </Grid>
      <Grid item xs={1} marginTop="1%" alignItems="right" marginBottom="2%">
        <BackButton />
      </Grid>
    </Grid>
  )
}
