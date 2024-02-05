import { useAuthContext } from "@asgardeo/auth-react";
import { useViewContext } from "../contexts/ViewContext";
import { useState, useEffect } from "react";
import { GrCheckmark, GrDownload } from "react-icons/gr";
import axios from "axios";

const ADDRESS_API = window.config.address_endpoint;
const MANAGER_API = window.config.manager_endpoint;

const Address = () => {
  const [nic, setNic] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser, setView } = useViewContext();
  const [userDB, setUserDB] = useState({});
  const { getAccessToken } = useAuthContext();
  const usr = [user, userDB];

  const retrieve = async (e) => {
    e.preventDefault();
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        const template = `${ADDRESS_API}/getPersonAddress?nic=${nic}`;
        const response = await axios.get(template, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);

        const data = response.data;
        setUserDB(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchAddress();
  };

  const approve = () => {
    const post = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        const data = {
          ...user,
          addressCheckstatus: 3,
        };
        const response = await fetch(
          `${MANAGER_API}/addressApprove?approve=true`,
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

        console.log("Response ", response);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("Error");
        console.error("Error fetching data:", error);
      }
    };
    post();
  };

  useEffect(() => {
    if (user) setNic(user.NIC);
  }, []);

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      <div className="flex flex-col gap-4">
        <div className="text-xl font-bold">Address Check</div>

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
            onClick={approve}
            disabled={loading}
          >
            <GrCheckmark />
            <div>Approve</div>
          </button>
        </form>

        {Object.keys(userDB).length !== 0 && (
          <table className="table-auto mt-4">
            <thead>
              <tr className="text-center bg-primary/[0.8] text-white text-sm">
                <th className="p-1 font-medium w-[50%] pl-2">
                  Address in database
                </th>
                <th className="p-1 font-medium w-[50%] pl-2">
                  Address provided
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-neutral/[0.05] divide-y">
                <td className="p-2 text-justify w-[50%] pl-2">
                  {userDB.number}
                </td>
                <td className="p-2 text-justify w-[50%] pl-2">{user.number}</td>
              </tr>
              <tr className="hover:bg-neutral/[0.05] divide-y">
                <td className="p-2 text-justify w-[50%] pl-2">
                  {userDB.street}
                </td>
                <td className="p-2 text-justify w-[50%] pl-2">{user.street}</td>
              </tr>
              <tr className="hover:bg-neutral/[0.05] divide-y">
                <td className="p-2 text-justify w-[50%] pl-2">
                  {userDB.district}
                </td>
                <td className="p-2 text-justify w-[50%] pl-2">
                  {user.district}
                </td>
              </tr>
              <tr className="hover:bg-neutral/[0.05] divide-y">
                <td className="p-2 text-justify w-[50%] pl-2">
                  {userDB.province}
                </td>
                <td className="p-2 text-justify w-[50%] pl-2">
                  {user.province}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Address;
