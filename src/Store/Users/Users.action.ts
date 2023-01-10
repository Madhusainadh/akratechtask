import axios from "axios";

import Dexie from "dexie";

const db: any = new Dexie("UsersDatabasearray");
db.version(10).stores({
  usersinfo: "++id,name,age,pick,gender,email",
});

export const Getusers = () => async (dispatch: any) => {
  dispatch({ type: "USERS_LOADING", payload: [] });
  try {
    let { data } = await axios.get("https://randomuser.me/api/?results=50");
    let users = data.results;

    var usersdata: Array<any> = [];

    for (var a = 0; a < users.length; a++) {
      let temp = {
        gender: users[a].gender,
        name: users[a].name.first,
        pick: users[a].picture.medium,
        age: users[a].dob.age,
        email: users[a].email,
      };
      usersdata.push(temp);
    }
    await db.usersinfo.count().then((count: number) => {
      if (count >= 50) {
        // If the maximum number of entries has been reached, delete the oldest entry
        db.usersinfo.delete().then(() => {
          // Insert the new entry
          db.usersinfo.bulkAdd(usersdata);
        });
      } else {
        // If the maximum number of entries has not been reached, simply insert the new entry
        db.usersinfo.bulkAdd(usersdata);
      }
    });
    console.log(usersdata);
    const usersarray = await db.usersinfo.toArray();
    console.log(usersarray);

    dispatch({
      type: "GET_USERS",
      payload: { data: usersarray, total: usersarray.length },
    });
  } catch (err: any) {
    console.log(err.message);
    dispatch({ type: "USERS_ERROR", payload: [] });
  }
};

export const deletefunction = (id: number) => async (dispatch: any) => {
  console.log("click")
  dispatch({ type: "POST_LOADING", payload: [] });
  try {
    let data = await db.usersinfo.delete(id);
    // console.log(data);
    const usersarray = await db.usersinfo.toArray();
    // console.log(usersarray);
    // db.usersinfo.bulkAdd(usersarray);
    dispatch({
      type: "GET_USERS",
      payload: { data: usersarray, total: usersarray.length },
    });

  } catch (err:any) {
    console.log(err.message)
    dispatch({ type: "POST_ERROR", payload: [] });
  }
};
