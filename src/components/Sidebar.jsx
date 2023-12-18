import SidebarListElement from "./SidebarListElement";
import {
  GrUserPolice,
  GrContactInfo,
  GrDocumentText,
  GrHome,
  GrCertificate,
} from "react-icons/gr";
import { useViewContext } from "../contexts/ViewContext";
import { useAuthContext } from "@asgardeo/auth-react";

const links = [
  // { title: "Home", icon: SlHome },
  { title: "Home", icon: GrHome, key: "Home" },
  { title: "Police Check", icon: GrUserPolice, key: "Police" },
  { title: "Identity Check", icon: GrDocumentText, key: "Identity" },
];

const Sidebar = () => {
  const { section, setSection } = useViewContext();

  const { signOut } = useAuthContext();

  const handleLogout = () => {
    signOut();
  };
  return (
    <div className="max-w-[18%] min-w-[18%] flex flex-col justify-between divide-y divide-neutral/[0.2]">
      <div className="flex items-center justify-center gap-2 p-4 text-xl tracking-widest">
        <GrCertificate className="text-primary" />
        <span>Grama Portal</span>
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
        <button onClick={() => signOut()}>log out</button>
      </div>
    </div>
  );
};
export default Sidebar;
