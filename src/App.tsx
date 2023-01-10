import logo from "./logo.svg";
import "./App.css";
import { makeStyles } from "@mui/styles";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import axios from "axios";
// import Getusers from "../"
import { useDispatch, useSelector } from "react-redux";
import { Getusers } from "./Store/Users/Users.action";
import SingleCard from "./components/SingleCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Total from "./components/Total";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  spin: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  },
});
interface IState {
  age: number;
email: string;
gender: string;
id: number;
name: string;
pick:string
 }
function App() {
  const classes = useStyles();
  const [usersarr,setusersarr]=useState<Array<IState>>([])
  const [totalusers,settotalusers]=useState<number>(0)
  const dispatch = useDispatch<any>();
  useEffect(() => {
    const fetch = async () => {
      await dispatch(Getusers());
    };
    fetch();
  }, []);

  const { data, total, loading } = useSelector((store: any) => store.users);
  useEffect(() => {
    setusersarr(data)
    settotalusers(total)
    // console.log(data, total);
  }, [data, total]);
  // console.log(data)
  interface IState {
    age: number;
    email: string;
    gender: string;
    id: number;
    name: string;
    pick: string;
  }

  if (loading) {
    return (
      <Box className={classes.spin}>
        <CircularProgress size={200} className={classes.spin} />
      </Box>
    );
  }
  return (
    <div style={{margin:"20px"}}>
      <Total/>
      <Grid container spacing={3}>
        {usersarr?.map((e: IState) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={e.id}>
            <SingleCard
              pick={e.pick}
              gender={e.gender}
              age={e.age}
              name={e.name}
              id={e.id}
              email={e.email}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
// age: 71;
// email: "ronald.hernandez@example.com";
// gender: "male";
// id: 1;
// name: "Ronald";
// pick: "https://randomuser.me/api/portraits/med/men/76.jpg";
export default App;
