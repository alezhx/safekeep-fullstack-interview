import React from 'react';
import './AppBarForm.css'
import { Grid, OutlinedInput, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm, Controller } from 'react-hook-form';

export default function AppBarForm(props) {
  const { createUser } = props;
  const { control, handleSubmit, formState: { errors }, reset } =
    useForm({
      mode: 'onSubmit',
      reValidateMode: 'onBlur',
      shouldFocusError: true,
      defaultValues: {
        firstName: '',
        lastName: '',
        hours: ''
      },
    });

  const onSubmit = async (params, e) => {
    try {
      await createUser(params, e)
      reset();
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <Grid
        item
        container
        justifyContent='center'
        alignItems='center'
        xs={12}
        className='appBar'
      >
        <Grid item xs={2}/>
        <Grid 
          item
          container
          xs={8}
          spacing={3}
        >
          <Grid item xs={6} md={3} className="centeredGrid">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true, minLength: 1 }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  fullWidth
                  autoFocus
                  error={!!errors.firstName}
                  className='textInput'
                  placeholder="Insert first name"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={3} className="centeredGrid">
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true, minLength: 1 }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  fullWidth
                  error={!!errors.lastName}
                  className='textInput'
                  placeholder="Insert last name"
                />
              )}
            />        
          </Grid>
          <Grid item xs={6} md={3} className="centeredGrid">
            <Controller
              name="hours"
              control={control}
              rules={{ required: true, validate: {
                isNumber: v => !isNaN(v)
              }}}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  fullWidth
                  error={!!errors.hours}
                  className='textInput'
                  placeholder="Participation (in hours)"
                />
              )}
            /> 
          </Grid>
          <Grid item xs={6} md={3} className="centeredGrid">
            <Button 
              type="submit"
              disabled={!!errors.firstName || !!errors.lastName || !!errors.hours}
              variant="outlined" 
              fullWidth 
              endIcon={<SendIcon/>}
              className='submitButton'
            >
              Send
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={2}/>
      </Grid>
    </form>
    )
}
