import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './DataTable.css';

export default function DataTable(props) {
  const { userData, deleteUser } = props;

  const calculateParticipation = (hours) => {
    const totalHours = userData.reduce((sum, prev) => sum + prev.hours, 0);
    const percentage = hours/totalHours * 100
    return percentage.toFixed(2)
  }

  return (
    <TableContainer component={Paper} elevation={6}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Participation</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.hours}</TableCell>
              <TableCell>{calculateParticipation(row.hours)}%</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => deleteUser(row.id)}>
                  <DeleteIcon className='deleteButton'/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}