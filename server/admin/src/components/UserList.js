import "./Styles/UserList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { deleteUser, getUsers } from "../context/userContext/apiCalls";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);  //user and dispatch from userContext

  useEffect(() => {
    getUsers(dispatch); //get users 
  }, [dispatch]);

  const handleDelete = (id) => {  //delete user by id
    deleteUser(id, dispatch);
    alert("Delete successfully");
  };

  const columns = [ //lists of users
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/user/" + params.row._id, user: params.row }}  //link to single user 
            >
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}  //delete user 
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="newproduct">
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        id={Math.random()}
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(row) => row._id}
        sx={{color: 'white'}}
      />
    </div>
  );
}
