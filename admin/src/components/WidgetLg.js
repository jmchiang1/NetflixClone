import "./Styles/WidgetLg.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetLg() {

  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    const getNewMovies = async () => {
      try {
        const res = await axios.get("movies?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        // console.log(res.data.slice(1,10));
        setNewMovies(res.data.slice(0,10));  //only return the last 5 movies 
      } catch (error) {
        console.log(error);
      }
    };
    // console.log(getNewMovies)
    getNewMovies();
  }, []);

  
  return (
    <div className="widgetSm">
    <span className="widgetSmTitle">Latest Added Movies</span>
    <ul className="widgetSmList">
      {/* Map movies and list them */}
      {newMovies.map((movie, i) => (
        <li className="widgetSmListItem" key={i}>
          <img
            src={ movie.img }
            alt="nothing to see here"
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{movie.title}</span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{movie.genre}</span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{movie.year}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>

    // <div className="widgetLg">
    //   <h3 className="widgetLgTitle">Latest transactions (Sample Data)</h3>
    //   <table className="widgetLgTable">
    //     <tbody>
    //       <tr className="widgetLgTr">
    //         <th className="widgetLgTh">Customer</th>
    //         <th className="widgetLgTh">Date</th>
    //         <th className="widgetLgTh">Amount</th>
    //       </tr>
    //       <tr className="widgetLgTr">
    //         <td className="widgetLgUser">
    //           <img
    //             src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    //             alt=""
    //             className="widgetLgImg"
    //           />
    //           <span className="widgetLgName">Susan Carol</span>
    //         </td>
    //         <td className="widgetLgDate">2 Jun 2021</td>
    //         <td className="widgetLgAmount">$122.00</td>
    //       </tr>
    //       <tr className="widgetLgTr">
    //         <td className="widgetLgUser">
    //           <img
    //             src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    //             alt=""
    //             className="widgetLgImg"
    //           />
    //           <span className="widgetLgName">Susan Carol</span>
    //         </td>
    //         <td className="widgetLgDate">2 Jun 2021</td>
    //         <td className="widgetLgAmount">$122.00</td>
    //       </tr>
    //       <tr className="widgetLgTr">
    //         <td className="widgetLgUser">
    //           <img
    //             src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    //             alt=""
    //             className="widgetLgImg"
    //           />
    //           <span className="widgetLgName">Susan Carol</span>
    //         </td>
    //         <td className="widgetLgDate">2 Jun 2021</td>
    //         <td className="widgetLgAmount">$122.00</td>
    //       </tr>
    //       <tr className="widgetLgTr">
    //         <td className="widgetLgUser">
    //           <img
    //             src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    //             alt=""
    //             className="widgetLgImg"
    //           />
    //           <span className="widgetLgName">Susan Carol</span>
    //         </td>
    //         <td className="widgetLgDate">2 Jun 2021</td>
    //         <td className="widgetLgAmount">$122.00</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
  );
}
