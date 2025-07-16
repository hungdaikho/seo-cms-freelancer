import React from "react";
import ListTool from "./features/list_tool";
import CopilotAI from "./features/copilot_ai";
import SeoProject from "./features/seo_project";
import Domain from "./features/domain";
import FooterProject from "./features/footer";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <ListTool />
      <CopilotAI />
      <SeoProject />
      <Domain />
      <FooterProject />
    </>
  );
};

export default Page;
