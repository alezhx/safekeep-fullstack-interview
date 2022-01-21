import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { config } from './config' 
import './App.css';
import { Grid, Typography } from '@mui/material';
import DataTable from './components/DataTable';
import AppBarForm from './components/AppBarForm';
import PieChart from './components/PieChart';


function App() {
  const [userData, setUserData] = useState([])

  const fetchUserData = useCallback(async () => {
    try {
      const res = await axios.get(config.api.url)
      setUserData(res.data)
    } catch (e) {
      console.log('error', e)
    }
  }, [setUserData])

  useEffect(() => 
    fetchUserData()
  , [fetchUserData])

  const createUser = async (params, e) => {
    const {firstName, lastName, hours} = params
    try {
      const res = await axios.post(config.api.url, {
        firstName,
        lastName,
        hours
      })
      fetchUserData();
      return res
    } catch (e) {
      console.log('error', e)
    }
  }

  const deleteUser = async(userId) => {
    try {
      await axios.delete(`${config.api.url}/:id`, {
        data: {
          id: userId
        }
      })
      fetchUserData();
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <div className='root'>
      <AppBarForm createUser={createUser}/>
      <div className='titleContainer'>
        <Typography className='title'>Safekeep User Participation</Typography>
        <Typography className='subtitle'>This app creates, demonstrates, and deletes users and their participation.</Typography>
      </div>
      {userData.length ? 
        <Grid container spacing={4} className='contentGrid'>
          <Grid item xs={12} md={6}>
            <DataTable userData={userData} deleteUser={deleteUser}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <PieChart userData={userData}/>
          </Grid>
        </Grid>
        : <div className='noData'>
            There's no user data to display!  
          </div>
        }
    </div>
  );
}

export default App;
