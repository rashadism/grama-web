import { useAuthContext } from "@asgardeo/auth-react";
import { useFlowContext } from "../contexts/FlowContext";
import Offense from "./Offense";
import { useState, useEffect } from "react";
import { GrCheckmark, GrDownload } from "react-icons/gr";
import axios from "axios";
import { useViewContext } from "../contexts/ViewContext";

const API = window.config.police_endpoint;

const Police = () => {
  const [nic, setNic] = useState("");
  const [offenses, setOffenses] = useState([]); // [{id, date, description}]
  const [loading, setLoading] = useState(false);
  // const { user, setUser } = useViewContext();
  const { getAccessToken } = useAuthContext();

  // useEffect(() => {
  //   if (user) {
  //     setNic(user.nic_number);
  //   }
  // }, [user]);
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

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchOffenses();
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
          <button
            className="btn px-4 flex justify-center items-center gap-2 bg-primary text-white hover:bg-transparent hover:text-primary"
            onClick={() => {}}
            disabled={loading}
          >
            <GrCheckmark />
            <div>Approve</div>
          </button>
        </form>
        <div className="flex w-1/2 justify-between">
          {/* {offenses && <div>Offense history for person with NIC: {nic}</div>}{" "} */}
          {/* <div className="font-semibold">
            Details of entered user couldn't be found :(
          </div> */}
        </div>
        {offenses.map((offense) => (
          <Offense
            key={offense.file_id}
            id={offense.file_id}
            date={offense.offense_date}
            description={offense.offense_description}
            location={offense.location}
          />
        ))}
      </div>
    </div>
  );
};

export default Police;
