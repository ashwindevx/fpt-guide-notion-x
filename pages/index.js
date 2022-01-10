import React from "react";
import Head from "next/head";
import { NotionAPI } from "notion-client";
import { Collection, CollectionRow, NotionRenderer } from "react-notion-x";
import { getPageTitle, getAllPagesInSpace } from "notion-utils";

const notion = new NotionAPI();

export const getStaticProps = async (context) => {
  const pageId = "5205ee376ebc4050a8bb94b9da83dcac"; //context.params.pageId;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

const App = ({ recordMap }) => {
  const title = getPageTitle(recordMap);
  console.log(title, recordMap);

  return (
    <>
      <Head>
        <meta name="description" content="React Notion X demo renderer." />
        <title>{title}</title>
      </Head>

      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootDomain="localhost:9090" // used to detect root domain links and open this in the same tab
        components={{
          collection: Collection,
          collectionRow: CollectionRow,
        }}
      />
    </>
  );
};

export default App;
