import "@mdxeditor/editor/style.css";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { useRef, useState } from "react";
import { GrCertificate } from "react-icons/gr";
import { useViewContext } from "../contexts/ViewContext";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";

const MANAGER_API = window.config.manager_endpoint;

const Editor = () => {
  const { user } = useViewContext();
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useAuthContext();
  const preset = `
To whom it may concern,
I certify that ${user.userID} is a resident of my GS division.
Yours,
Grama Niladhari`;
  const { setView } = useViewContext();
  const issue = () => {
    const post = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        console.log(user, "user");
        const data = {
          ...user,
          statusID: 4,
          characterW: ref.current?.getMarkdown(),
        };
        const response = await fetch(`${MANAGER_API}/writeCharacter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          // mode: "no-cors",
          body: JSON.stringify(data),
        });

        console.log("Response ", response);

        setLoading(false);
        setView("Home");
      } catch (error) {
        setLoading(false);
        alert("Error");
        console.error("Error fetching data:", error);
      }
    };
    post();
  };

  const ref = useRef(null);
  return (
    <div className="flex flex-col gap-4">
      <button
        className="btn flex items-center gap-2 w-48 justify-center"
        onClick={issue}
      >
        <GrCertificate />
        Issue Certificate
      </button>
      <MDXEditor
        ref={ref}
        markdown={preset}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <BoldItalicUnderlineToggles />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
};

export default Editor;
