import { useAuthContext } from "@asgardeo/auth-react";
import Offense from "./Offense";
import { useState, useEffect } from "react";
import { GrCheckmark, GrDownload } from "react-icons/gr";
import axios from "axios";
import { useViewContext } from "../contexts/ViewContext";
import Spinner from "./Spinner";

const API = window.config.police_endpoint;
const MANAGER_API = window.config.manager_endpoint;

const Police = ({ notify }) => {
  const [nic, setNic] = useState("");
  const [offenses, setOffenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setSection } = useViewContext();
  const { getAccessToken } = useAuthContext();

  useEffect(() => {
    if (user) setNic(user.NIC);
  }, []);

  const retrieve = async (e) => {
    e.preventDefault();
    const fetchOffenses = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        console.log(token);
        const response = await axios.get(`${API}/offenses/${nic}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        if (data.length !== 0) {
          setOffenses(data);
        } else {
          setOffenses([]);
        }
        notify(true);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        notify(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchOffenses();
  };

  const approve = (e) => {
    e.preventDefault();
    const post = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        const data = {
          ...user,
          policeCheckStatus: 3,
        };
        const response = await fetch(
          `${MANAGER_API}/policeApprove?approve=true`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        );

        notify(true);
        setLoading(false);
        setSection("Home");
      } catch (error) {
        setLoading(false);
        notify(false);
        console.error("Error fetching data:", error);
      }
    };
    post();
  };

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      <div className="flex flex-col gap-4">
        <div className="text-xl font-bold">Police Check</div>

        <form action="submit" className="flex gap-2 w-1/2">
          <input
            type="text"
            placeholder="Enter NIC Number"
            className="pl-2 py-1 rounded-lg flex-1"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <button
            className="btn px-4 flex justify-center items-center gap-2"
            onClick={retrieve}
            disabled={loading}
          >
            <GrDownload />
            <div>Retrieve</div>
          </button>
          {Object.keys(user).length !== 0 && (
            <button
              className="btn px-4 flex justify-center items-center gap-2 bg-primary text-white hover:bg-transparent hover:text-primary"
              onClick={approve}
              disabled={loading}
            >
              <GrCheckmark />
              <div>Approve</div>
            </button>
          )}
        </form>
        {!loading &&
          offenses.map((offense) => (
            <Offense
              key={offense.file_id}
              id={offense.file_id}
              date={offense.offense_date}
              description={offense.offense_description}
              location={offense.location}
            />
          ))}
        {loading && (
          <div className="h-screen flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Police;
