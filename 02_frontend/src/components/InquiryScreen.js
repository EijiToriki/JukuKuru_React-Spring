import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid } from '@mui/material';
import {classRoomDatesDummy, comeDatesDummy} from '../dummy_data/inquiryDummy';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useNavigate } from 'react-router-dom';

const comeDates = comeDatesDummy
const classRoomDates = classRoomDatesDummy

export default function InquiryScreen() {
  const [classDates, setClassDates] = React.useState([])
  const [studentDatesObj, setStudentDatesObj] = React.useState({})
  const [komaList, setKomaList] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    const dateList = []
    const komaList = []
    for(const classRoomDate of classRoomDates){
      if(dateList.indexOf(classRoomDate.date) === -1){
        dateList.push(classRoomDate.date)
      }
      if(komaList.indexOf(classRoomDate.class_time) === -1){
        komaList.push(classRoomDate.class_time)
      }
    }
    dateList.sort(function(a, b) {
      return a.localeCompare(b)
    })
    komaList.sort(function(a, b) {
      return a - b;
    })
    setClassDates(dateList)
    setKomaList(komaList)

    const studentDatesObj = {}
    for (const comeDate of comeDates) {
      if (!studentDatesObj[comeDate.date]) {
        studentDatesObj[comeDate.date] = [];
      }
      studentDatesObj[comeDate.date].push(comeDate.class_time);
    }
    setStudentDatesObj(studentDatesObj)
    console.log(studentDatesObj)
  }, [])

  const backTopPage = () =>{
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
        <Box flexDirection="row" justifyContent="flex-end" display="flex">
          <Button variant="contained" color="inherit" onClick={backTopPage}>戻る</Button>
        </Box>
      </Grid>
    </Grid>
  );
}