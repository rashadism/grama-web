import "@mdxeditor/editor/style.css";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { useRef } from "react";
import { GrCertificate } from "react-icons/gr";

const preset = `Date today
My address

To whom it may concern,
I certify that Mr. User is a very good boi and has not done many crimes(police said so too)
Yours,
Grama Niladhari`;

const Editor = () => {
  const ref = useRef(null);
  return (
    <div className="flex flex-col gap-4">
      <button
        className="btn flex items-center gap-2 w-48 justify-center"
        onClick={() => alert(ref.current?.getMarkdown())}
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
