import "@mdxeditor/editor/style.css";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import Spinner from "./Spinner";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { useRef, useState } from "react";
import { GrCertificate } from "react-icons/gr";
import { useViewContext } from "../contexts/ViewContext";
import { useAuthContext } from "@asgardeo/auth-react";

const MANAGER_API = window.config.manager_endpoint;

const Editor = () => {
  const { user, setEditor } = useViewContext();
  const [loading, setLoading] = useState(false);
  const { getAccessToken } = useAuthContext();
  const preset = `
To whom it may concern,
I certify that ${user.name} who resides at ${user.number}, ${user.street}, ${user.district} district is indeed a resident of my GS division ${user.gramaID}.
Yours,
Grama Niladhari
Division: ${user.gramaID}`;
  const { setSection } = useViewContext();
  const ref = useRef(null);
  const issue = () => {
    const post = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        const data = {
          ...user,
          statusID: 4,
          characterW: ref.current?.getMarkdown(),
        };
        console.log("userdata", data);
        const response = await fetch(`${MANAGER_API}/writeCharacter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        console.log("Response ", response);

        setLoading(false);
        setEditor(false);
      } catch (error) {
        setLoading(false);
        alert("Error");
        console.log("Error fetching data:", error);
      }
    };
    post();
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        className="btn flex items-center gap-2 w-48 justify-center"
        onClick={issue}
      >
        <GrCertificate />
        Issue Certificate
      </button>

      {loading && (
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}

      <MDXEditor
        className={loading && "hidden"}
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
