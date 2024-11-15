import "@fontsource-variable/fraunces";
import "@fontsource-variable/outfit";
import "../stylesheets/common.css";
import "../stylesheets/index.css";

import * as React from "react";

const isBrowser = typeof window !== "undefined";
import type { HeadFC, PageProps } from "gatsby";

export const Head: HeadFC = () => <title>thePmSquare | server</title>;

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="index-main">
      <div className="index-container">
        <h1 className="index-title">welcome</h1>
        <div className="index-subtitle">to thePmSquare's server</div>
      </div>
    </main>
  );
};

export default IndexPage;
