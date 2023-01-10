import React from 'react'
import Typography from "@mui/material/Typography";
import { useSelector } from 'react-redux';

const Total = () => {
    const { data, total, loading } = useSelector((store) => store.users);

  return (
    <div style={{margin:"20px"}}  >
    <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>Total Users:- {total}</Typography>
    </div>
  )
}

export default Total
