import "./Styles/WidgetSm.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axiosInstance.get("users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Latest Added Members</span>
      <ul className="widgetSmList">
        {/* Map users and list them */}
        {newUsers.map((user, i) => (
          <li className="widgetSmListItem" key={i}>
            <img
              src={
                user.profilePic || //set img from DB or default image
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt="nothing to see here"
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

//REPLACEMENT CODE
// <table key={i} className="widgetLgTable">
//   <tbody>
//     {/* Table Headers */}
//     <tr className="widgetLgTr">
//       <th className="widgetLgTh">User</th>
//       <th className="widgetLgTh">Email</th>
//     </tr>
//     <tr className="widgetLgTr">
//       <td className="widgetLgUser">
//         <img
//           className="widgetSmImg"
//           src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
//           alt="nothing to see here"
//         />
//         <span>{user.username}</span>
//         <span>{user.email}</span>
//       </td>
//     </tr>
//   </tbody>
// </table>
