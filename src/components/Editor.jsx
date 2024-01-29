import "@mdxeditor/editor/style.css";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { useRef } from "react";
import { GrCertificate } from "react-icons/gr";
import { useViewContext } from "../contexts/ViewContext";

const preset = `
To whom it may concern,
I certify that ${user.userID} is a resident of my GS division.
Yours,
Grama Niladhari`;

const Editor = () => {
  const { setView } = useViewContext();
  const issue = () => {
    const post = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        const response = await axios.post(
          `${MANAGER_API}/addressApprove`,
          {
            ...user,
            statusID: 3,
            characterW: ref.current?.getMarkdown(),
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
