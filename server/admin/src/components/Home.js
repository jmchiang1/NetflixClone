import "./Styles/Home.css";
import WidgetSm from "./WidgetSm";
import WidgetLg from "./WidgetLg";

export default function Home() {
  return (
    <div className="home">
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

//OLD CODE - might use later?
  // const MONTHS = useMemo(
  //   () => [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Agu",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ],
  //   []
  // );

  // const [userStats, setUserStats] = useState([]);

  // useEffect(() => {
  //   const getStats = async () => {
  //     try {
  //       const res = await axios.get("/users/stats", {
  //         headers: {
  //           token:
  //             "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //         },
  //       });
  //       const statsList = res.data.sort(function (a, b) {
  //         return a._id - b._id;
  //       });
  //       statsList.map((item) =>
  //         setUserStats((prev) => [
  //           ...prev,
  //           { name: MONTHS[item._id - 1], "New User": item.total },
  //         ])
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getStats();
  // }, [MONTHS]);