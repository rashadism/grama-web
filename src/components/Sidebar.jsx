import SidebarListElement from "./SidebarListElement";
import {
  GrUserPolice,
  GrGroup,
  GrFlows,
  GrGlobe,
  GrLogout,
} from "react-icons/gr";
import { useViewContext } from "../contexts/ViewContext";
import { useAuthContext } from "@asgardeo/auth-react";

const links = [
  { title: "Requests", icon: GrFlows, key: "Home" },
  { title: "Police Check", icon: GrUserPolice, key: "Police" },
  { title: "Accounts", icon: GrGroup, key: "Identity" },
];

const Sidebar = () => {
  const { signOut } = useAuthContext();

  const { derivedAuthenticationState } = useViewContext();
  // console.log(derivedAuthenticationState);

  return (
    <div className="max-w-[22%] min-w-[22%] flex flex-col justify-between divide-y divide-neutral/[0.2]">
      <div className="flex items-center justify-center gap-2 p-4 text-lg font-medium font-mono tracking-wide">
        <GrGlobe className="text-primary" />
        <span className="text-xl">Grama Portal</span>
      </div>
      <div className="flex flex-col flex-grow divide-y divide-neutral/[0.2]">
        <div className="flex-grow">
          {links.map((link) => (
            // eslint-disable-next-line react/jsx-key
            <SidebarListElement
              key={link.key}
              title={link.title}
              icon={link.icon}
              view={link.key}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <div className="text-center">
            {derivedAuthenticationState?.decodedIDTokenPayload?.email}
          </div>
          <div className="text-neutral text-center">
            GS ID: {derivedAuthenticationState?.decodedIDTokenPayload?.gid_g4}
          </div>

          <button
            onClick={() => signOut()}
            className="btn flex justify-center items-center gap-2  mx-1 my-2 flex-1"
          >
            <GrLogout />
            <div>Sign Out</div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
