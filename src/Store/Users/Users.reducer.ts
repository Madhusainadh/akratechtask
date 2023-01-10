import { createStore, Action } from "redux";
import { json } from "stream/consumers";

// Define the interface for the action object
interface IAction extends Action {
  payload: any;
}

// Define the interface for the state object
interface IState {
  loading: boolean;
  error: boolean;
  data: any;
  total: number;
}

const initState: IState = {
  loading: false,
  error: false,
  data: [],
  total: 0,
};
export const USERSReducer = (
  state: IState = initState,
  { type, payload }: any
) => {
  switch (type) {
    case "GET_USERS": {
        console.log(type,payload)
      return {
        ...state,
        loading: false,
        error: false,
        data: payload.data,
        total: payload.total,
      };
    }
    case "USERS_LOADING": {
      console.log(type,payload)
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case "USERS_ERROR": {
      // console.log(type,payload)
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};
