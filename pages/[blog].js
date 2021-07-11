import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import CodeBlock from "../lib/CodeBlock";
import Head from "next/head";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
const Blog = ({ content, data }) => {
  const frontmatter = data;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description"></meta>
        <title></title>
      </Head>
      <h1>{frontmatter.title}</h1>
      <h3>{frontmatter.description}</h3>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        // escapeHtml={true}
        children={content}
        components={CodeBlock}
      />
      <MarkNav
        className="article-menu"
        source={content}
        headingTopOffset={80}
      />
    </>
  );
};

export default Blog;

Blog.getInitialProps = async (context) => {
  const { blog } = context.query;
  // Import our .md file using the `slug` from the URL
  const content = await import(`../content/${blog}.md`);
  const data = matter(content.default);

  return { ...data };
};
