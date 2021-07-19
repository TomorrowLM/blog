import matter from "gray-matter";
import "markdown-navbar/dist/navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: 4,
    paddingBottom: 11,
  },
  default: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
}));
const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
const category = ({ data }) => {
  const classes = useStyles();
  const RealData = data.map((blog) => matter(blog));
  console.log(RealData);
  const ListItems = RealData.map((listItem) => listItem.data);
  let categoryList = ListItems.map((blog, i) => {
    return blog.category;
  });
  categoryList = Array.from(new Set(categoryList));

  const router = useRouter();
  const category = router.query.category;
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    setInProp(true);
  });
  return (
    <Transition timeout={duration} in={inProp}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
            background: 'url("/7.jpg") no-repeat center center fixed',
            backgroundSize: "cover",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div className={classes.root}></div>
        </div>
      )}
    </Transition>
  );
};

export default category;
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      "/category/category",
      // Object variant:
    ],
    fallback: true,
  };
}
export async function getStaticProps() {
  const fs = require("fs");
  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");

  const blogs = files.filter((fn) => fn.endsWith(".md"));
  const data = blogs.map((blog) => {
    const path = `${process.cwd()}/content/${blog}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });
    return rawContent;
  });
  return {
    props: {
      data: data,
    },
  };
}
