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
import { fetchDates, getClassRoomPropList, getDateClasstimeObj } from '../methods/initProcess';
import BackButton from '../common/BackButton';
import { registerDateToServer } from '../methods/requestProcess';
import { getClassRoomId } from '../methods/commonProcess';

export default function RegisterScreen() {
  const [openDateRes, setOpenDateRes] = useState({})
  const [openDateList, setOpenDateList] = React.useState([])
  const [openKomaList, setOpenKomaList] = React.useState([])
  const [openDateKomaTable, setOpenDateKomaTable] = React.useState({})
  const [selectIcons, setSelectIcons] = React.useState({});
  const navigate = useNavigate()

  React.useEffect(() => {
    const params = {
      classroomId: 1
    }
    fetchDates(params, "getOpenDate").then(resData => {
      setOpenDateRes(resData)
      const dateList = getClassRoomPropList(resData, "date")
      setOpenDateList(
        dateList.sort(function(a, b) {
          return a.localeCompare(b)
        })
      )
  
      const openKomaList = getClassRoomPropList(resData, "class_time")
      setOpenKomaList(
        openKomaList.sort(function(a, b) {
          return a - b;
        })
      )
      
      const openDateKomaTable = getDateClasstimeObj(resData)
      setOpenDateKomaTable(openDateKomaTable)
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

  const handleRegister = () => {
    const postClassIds = []
    for(const selectIconId in selectIcons){
      if(selectIcons[selectIconId]){
        postClassIds.push(selectIconId)
      }
    }
    registerDateToServer(1, postClassIds)
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
                  openKomaList.map((koma) => (
                    <TableCell align="right" key={koma}>{koma}コマ目</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {openDateList.map((date) => (
                <TableRow
                  key={date}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{date}</TableCell>
                  {
                    openKomaList.map((koma) => (
                      openDateKomaTable[date] && openDateKomaTable[date].indexOf(koma) !== -1 ?
                        <TableCell align="right" key={koma}>
                          {selectIcons[getClassRoomId(openDateRes, date, koma)] ?
                            <IconButton onClick={() => handleIconClick(getClassRoomId(openDateRes, date, koma))}>
                              <LensIcon />
                            </IconButton>
                          :
                            <IconButton onClick={() => handleIconClick(getClassRoomId(openDateRes, date, koma))}>
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
