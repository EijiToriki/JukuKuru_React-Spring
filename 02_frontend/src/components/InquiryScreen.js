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
import { fetchClassRoomDates, fetchStudentDates, getClassRoomPropList, getDateClasstimeObj } from '../methods/initprocess';
import BackButton from '../common/BackButton';


export default function InquiryScreen() {
  const [classDates, setClassDates] = React.useState([])
  const [studentDatesObj, setStudentDatesObj] = React.useState({})
  const [komaList, setKomaList] = React.useState([])

  React.useEffect(() => {
    fetchClassRoomDates().then(classRoomDates => {
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
    })

    fetchStudentDates().then(studentDates => {
      const studentDatesObj = getDateClasstimeObj(studentDates)
      setStudentDatesObj(studentDatesObj)
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
                      studentDatesObj[date] && studentDatesObj[date].indexOf(koma) !== -1 ?
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