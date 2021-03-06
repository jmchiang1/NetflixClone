import "./Styles/ListList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListContext } from "../context/listContext/ListContext";
import { deleteList, getLists } from "../context/listContext/apiCalls";

export default function ListList() {
  const { lists, dispatch } = useContext(ListContext);  //grab lists and dispatch function from list context

  useEffect(() => { //grab lists
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {  //delete lists
    deleteList(id, dispatch);
    alert("Delete list successful !");
  };

  const columns = [ //table showing all lists 
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/" + params.row._id, list: params.row }}  //link to single list view 
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="newproduct">
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
        sx={{color: 'white'}}
      />
    </div>
  );
}
