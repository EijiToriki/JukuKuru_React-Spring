import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import {classRoomDatesDummy, comeDatesDummy} from '../dummy_data/inquiryDummy';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('12/26', 159, 6.0, 24, 4.0),
  createData('12/27', 237, 9.0, 37, 4.3),
  createData('12/28', 262, 16.0, 24, 6.0),
  createData('12/29', 305, 3.7, 67, 4.3),
  createData('12/30', 356, 16.0, 49, 3.9),
];

const comeDates = comeDatesDummy
const classRoomDates = classRoomDatesDummy

export default function InquiryScreen() {
  const [classDates, setClassDates] = React.useState([])
  const [komaList, setKomaList] = React.useState([])

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
  }, [])


  return (
    <Grid container spacing={2} width="80%" margin="auto" marginTop="5%">
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
                    // Todo : ここで生徒の来塾日情報から、三項演算子でしょりを分ける
                    <TableCell align="right" key={koma}>{koma}コマ目</TableCell>
                  ))
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}