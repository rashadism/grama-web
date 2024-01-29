import { useState, useEffect } from "react";

const data = [
  {
    NIC: "A123456789",
    Name: "John Doe",
    UserID: "john123",
    accountStatusID: 1,
    genderID: 1,
    gramaID: "G123",
  },
  {
    NIC: "A126456789",
    Name: "Mo Rashad",
    UserID: "john123",
    accountStatusID: 1,
    genderID: 1,
    gramaID: "G123",
  },
  {
    NIC: "B987654321",
    Name: "Jane Smith",
    UserID: "jane456",
    accountStatusID: 2,
    genderID: 2,
    gramaID: "G456",
  },
  {
    NIC: "C111223344",
    Name: "Bob Johnson",
    UserID: "bob789",
    accountStatusID: 1,
    genderID: 1,
    gramaID: "G789",
  },
  {
    NIC: "D555667788",
    Name: "Alice Williams",
    UserID: "alice101",
    accountStatusID: 2,
    genderID: 2,
    gramaID: "G101",
  },
];

const Identity = () => {
  const [requests, setRequests] = useState([]);

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      {data.map((row) => (
        <div
          key={row.UserID}
          className="shadow-sm p-5 hover:shadow-md bg-white/[0.25] w-5/6"
        >
          <div className="flex justify-left items-center gap-4">
            <div className="flex flex-col flex-grow max-w-40 min-w-40">
              <div className="font-semibold text-lg">{row.Name}</div>
              <div className="text-base text-xs">{row.NIC}</div>
            </div>
            <div className="flex flex-grow">
              {row.genderID == 1 ? "Male" : "Female"}
            </div>
            <div className="flex gap-2">
              <div>
                <button
                  className={
                    "btn px-4 flex justify-center items-center gap-2" +
                    (row.accountStatusID === 1 && " invisible")
                  }
                  onClick={() => alert("todo")}
                  disabled={row.accountStatusID === 1}
                >
                  <div>Activate</div>
                </button>
              </div>
              <div>
                <button
                  className="btn px-4 flex justify-center items-center gap-2"
                  onClick={() => alert("todo")}
                  // disabled={loading}
                >
                  <div>Pass check</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Identity;
