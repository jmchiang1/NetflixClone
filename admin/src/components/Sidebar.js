import "./Styles/Sidebar.css";
import {
  LineStyle,
  PermIdentity,
  PlayCircleOutline,
  List,
  AddToQueue,
  QueuePlayNext,
} from "@material-ui/icons";
import { Link, useHistory, NavLink } from "react-router-dom";

function Sidebar() {

  const currentRoute = useHistory().location.pathname.toLowerCase();
 
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {/* Home Link */}
            <Link to="/" className="link" >
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {/* Users Link */}
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            {/* Movies Link */}
            <Link to="/movies" className="link">
              <li className="sidebarListItem" active="true">
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            {/* Lists Link */}
            <Link to="/lists" className="link">
              <li className="sidebarListItem" active="true">
                <List className="sidebarIcon" />
                Lists
              </li>
            </Link>
            {/* Add Movie Link */}
            <Link to="/newMovie" className="link">
              <li className="sidebarListItem" active="true">
                <AddToQueue className="sidebarIcon" />
                Add Movie
              </li>
            </Link>
            {/* Add List Link */}
            <Link to="/newList" className="link">
              <li className="sidebarListItem" active="true">
                <QueuePlayNext className="sidebarIcon" />
                Add List
              </li>
            </Link>
            {/* Add User Link */}
            <Link to="/newUser" className="link">
              <li className="sidebarListItem" active="true">
                <QueuePlayNext className="sidebarIcon" />
                Add User
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
