import React from "react";
import { useViewContext } from "../contexts/ViewContext";
import { useAuthContext } from "@asgardeo/auth-react";
import { useState } from "react";
import Spinner from "./Spinner";

const IDENTITY_API = window.config.identity_endpoint;
const MANAGER_API = window.config.manager_endpoint;

const Identity = ({ notify }) => {
  const { user, setSection } = useViewContext();
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useAuthContext();

  const activate = (request) => {
    const updateManager = async () => {
      const data = {
        ...request,
        identityCheckstatus: 3,
      };
      console.log("data", data);
      try {
        setLoading(true);
        const token = await getAccessToken();
        const response = await fetch(`${MANAGER_API}/idApprove?approve=true`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        setLoading(false);
        notify(true);
        setSection("Home");
      } catch (error) {
        setLoading(false);
        notify(false);
        alert("Error");
        console.log("Error fetching data(update):", error);
      }
    };
    updateManager();

    const updateId = async () => {
      const data = {
        NIC: request.NIC,
        Name: request.name,
        Userid: request.userID,
        gramaId: request.gramaID,
      };

      try {
        setLoading(true);
        const token = await getAccessToken();
        const response = await fetch(`${IDENTITY_API}/activateAccount`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        console.log(response);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        notify(false);
        alert("Error");
        console.log("Error fetching data(update):", error);
      }
    };
    updateId();
  };

  useEffect(() => {
    const getStatus = async () => {
      const data = {
        NIC: user.NIC,
        Name: user.name,
        Userid: user.userID,
        gramaId: user.gramaID,
      };
      const response = await fetch(`${IDENTITY_API}/checkid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      console.log(response.data);
    };
    getStatus();
  }, []);

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      <div className="text-2xl font-bold">Account activation request</div>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div>
            <span className="font-bold">Name: </span> {user.name}
          </div>
          <div>
            <span className="font-bold">User id:</span> {user.userID}
          </div>

          <div>
            <span className="font-bold">Address: </span> {user.number}
            {", "}
            {user.street}
            {", "}
            {user.district}
            {", "}
            {user.province}
          </div>
          <div>
            <span className="font-bold">Request id:</span> {user.requestID}
          </div>
          <div>
            <span className="font-bold">Reason for request: </span>
            {user.reason}
          </div>

          <div>
            <button
              className="btn px-4 flex justify-center items-center gap-2 mt-6"
              onClick={() => activate(user)}
            >
              <div>Activate account</div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Identity;
