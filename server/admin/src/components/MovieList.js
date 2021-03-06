import "./Styles/MovieList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../context/movieContext/apiCalls";

export default function MovieList() {
  const { movies, dispatch } = useContext(MovieContext);  //grab movies and dispatch

  useEffect(() => {
    getMovies(dispatch);  //get movies
  }, [dispatch]);

  const handleDelete = (id) => {  //delete movie by id
    deleteMovie(id, dispatch);
    alert("Delete successfully !");
  };

  const columns = [ //table of movies 
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "movie",
      headerName: "Movie",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}  //link to single movie page 
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}  //delete movie
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="newproduct">
        <Link to="/newMovie">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
        height="106%"
        sx={{color: 'white'}}
      />
    </div>
  );
}
