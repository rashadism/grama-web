import Offense from "./Offense";
import { useState, useEffect } from "react";

const API = "http://localhost:8080";

const Police = () => {
  const [nic, setNic] = useState("");
  const [offenses, setOffenses] = useState([]); // [{id, date, description}]
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({}); // {name, nic}

  const retrieve = async (e) => {
    e.preventDefault();
    const fetchOffenses = async () => {
      setLoading(true);
      const res = await fetch(`${API}/offenses/${nic}`);
      const data = await res.json();
      console.log(data);
      if (data.length !== 0) {
        setUser({ name: data[0].name, nic: nic });
        setOffenses(data);
      } else {
        setUser({
          name: "Details of entered user couldn't be found :(",
          nic: "",
        });
        setOffenses([]);
      }

      setLoading(false);
    };
    fetchOffenses();
  };

  return (
    <div className="bg-neutral/[0.2] px-24 py-24 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      <div className="flex flex-col gap-4">
        <form action="submit" className="flex gap-2 w-1/2">
          <input
            type="text"
            placeholder="Enter NIC Number"
            className="pl-2 py-1 rounded-lg flex-1"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4 py-1 rounded-lg"
            onClick={retrieve}
            disabled={loading}
          >
            RETRIEVE
          </button>
        </form>
        <div className="flex w-1/2 justify-between p-5">
          <div className="font-semibold">{user.name}</div>
          <div className="text-slate-400">{user.nic}</div>
          {/* <div className="font-semibold">
            Details of entered user couldn't be found :(
          </div> */}
        </div>
        {offenses.map((offense) => (
          <Offense
            key={offense.offense_id}
            id={offense.offense_id}
            date={offense.offense_date}
            description={offense.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Police;
