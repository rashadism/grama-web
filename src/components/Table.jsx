import { useState, useEffect } from "react";
import { GrFormEdit } from "react-icons/gr";
import { useViewContext } from "../contexts/ViewContext";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";
import Spinner from "./Spinner";

const cols = [
  "Request ID",
  "Username",
  "Identity Check",
  "Address Check",
  "Police Check",
  "Status",
  "",
];

const process = (val) => {
  if (typeof val === "boolean") {
    return (
      <span className={val ? "badge-green" : "badge-red"}>
        {val ? "passed" : "pending"}
      </span>
    );
  } else return val;
};

const map = (input) => {
  if (input === 1 || input === 2) {
    return false;
  } else if (input === 3) {
    return true;
  }
};

const API = window.config.manager_endpoint;

const Table = ({ handleClick }) => {
  const [pending, setPending] = useState([]);
  const { section, setSection } = useViewContext();
  const { getAccessToken } = useAuthContext();
  const { derivedAuthenticationState } = useViewContext();
  const [loading, setLoading] = useState(false);

  // TODO: fetch from manager
  useEffect(() => {
    const getRequests = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        console.log(token);
        const gid = derivedAuthenticationState?.decodedIDTokenPayload?.gid_g4;
        const response = await axios.get(
          `${API}/getRequestsbyGramaID?gramaID=${gid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log("data", data);
        setPending(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    getRequests();
  }, [section]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        console.log(token);
        const gid = derivedAuthenticationState?.decodedIDTokenPayload?.gid_g4;
        const response = await axios.get(
          `${API}/getRequestsbyGramaID?gramaID=${gid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log("data", data);
        setPending(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    getRequests();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <table className="table-auto">
      <thead>
        <tr className="text-center bg-primary/[0.8] text-white text-sm">
          {cols.map((col) => (
            <th className="p-1 font-medium" key={col}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pending.map((request) => {
          return (
            <tr
              className="hover:bg-neutral/[0.05] divide-y"
              key={request.requestID}
            >
              <td className="p-2 text-center">{process(request.requestID)}</td>
              <td className="p-2 text-center flex flex-col">
                {process(request.name)}
              </td>
              <td className="p-2 text-center">
                {process(map(request.identityCheckstatus))}
              </td>
              <td className="p-2 text-center">
                {process(map(request.addressCheckstatus))}
              </td>
              <td className="p-2 text-center">
                {process(map(request.policeCheckstatus))}
              </td>
              <td className="p-2 text-center">
                {process(map(request.statusID))}
              </td>
              <td className="p-2 text-center text-xl">
                <GrFormEdit
                  className="hover:text-primary cursor-pointer"
                  onClick={() => handleClick(request)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
