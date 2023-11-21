import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { fetchDates, getClassRoomPropList, getDateClasstimeObj } from '../methods/initProcess';
import BackButton from '../common/BackButton';


export default function InquiryScreen() {
  const [openDateList, setOpenDateList] = React.useState([])
  const [openKomaList, setOpenKomaList] = React.useState([])
  const [comeDateKomaTable, setComeDateKomaTable] = React.useState({})

  React.useEffect(() => {
    const getOpenDateParams = {
      classroomId: 1
    }
    fetchDates(getOpenDateParams, "getOpenDate").then(classRoomDates => {
      const dateList = getClassRoomPropList(classRoomDates, "date")
      setOpenDateList(
        dateList.sort(function(a, b) {
          return a.localeCompare(b)
        })
      )
  
      const openKomaList = getClassRoomPropList(classRoomDates, "class_time")
      setOpenKomaList(
        openKomaList.sort(function(a, b) {
          return a - b;
        })
      )
    })

    const getComeDateParams = {
      studentId: 1
    }
    fetchDates(getComeDateParams, "getComeDate").then(studentDates => {
      const comeDateKomaTable = getDateClasstimeObj(studentDates)
      setComeDateKomaTable(comeDateKomaTable)
    })
  }, [])

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
                      comeDateKomaTable[date] && comeDateKomaTable[date].indexOf(koma) !== -1 ?
                        <TableCell align="right" key={koma}><CircleOutlinedIcon /></TableCell>
                      :
                        <TableCell align="right" key={koma}><ClearOutlinedIcon /></TableCell>
                    ))
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} marginTop="1%" alignItems="right">
        <BackButton />
      </Grid>
    </Grid>
  );
}