import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { deletefunction } from "../Store/Users/Users.action";
interface IState {
  age: number;
  email: string;
  gender: string;
  id: number;
  name: string;
  pick: string;
}
const SingleCard: React.FC<IState> = (props) => {
  const dispatch = useDispatch<any>();
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.pick}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Name:- {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            gender: {props.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {props.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => dispatch(deletefunction(props.id))}
            size="small"
          >
            delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SingleCard;
