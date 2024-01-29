import React from "react";
import { useFlowContext } from "../contexts/FlowContext";
import { useViewContext } from "../contexts/ViewContext";
import { useAuthContext } from "@asgardeo/auth-react";
import { useState } from "react";
import axios from "axios";

const API = window.config.identity_endpoint;

const Identity = () => {
  const { idUser } = useViewContext();
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useAuthContext();

  const activate = (request) => {
    const post = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        const response = await axios.post(
          `${API}/offenses/activateAccount`,
          {
            NIC: "",
            Name: "",
            Userid: request.userID,
            gramaId: request.gramaID,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response ", response);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    post();
  };

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      <div className="text-2xl font-bold">Account activation request</div>
      <div>
        <span className="font-bold">User id:</span> {idUser.userID}
      </div>
      <div>
        {" "}
        <span className="font-bold">Request id:</span> {idUser.userID}
        {idUser.requestID}
      </div>
      <div>
        {" "}
        <span className="font-bold">Reason for request: </span>
        {idUser.reason}
      </div>

      <div>
        <button
          className="btn px-4 flex justify-center items-center gap-2 mt-6"
          onClick={() => activate(idUser)}
        >
          <div>Activate account</div>
          {/* manager eke pass identity check, activate in identity check */}
        </button>
      </div>
    </div>
  );
};

export default Identity;
