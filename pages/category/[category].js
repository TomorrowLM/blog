import matter from "gray-matter";
import "markdown-navbar/dist/navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import SideBar from "../components/homepage/SideBar";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
const category = ({ categoryList }) => {
  const classes = useStyles();
  const router = useRouter();
  const category = router.query.category;
  const [inProp, setInProp] = useState(false);
  console.log(categoryList);
  categoryList = categoryList || [];
  let categoryTitle = categoryList.map((value, index) => {
    if (value[0] === category) {
      console.log(value[1]);
      return value[1];
    }
  });
  console.log(categoryList);
  categoryList = categoryList.map((value) => {
    return value[0];
  });
  categoryList = Array.from(new Set(categoryList));
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
            paddingTop: 15,
            paddingLeft: "5vw",
            paddingRight: "5vw",
          }}
        >
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item sm={3} xs={12}>
                <SideBar categoryList={categoryList}></SideBar>
              </Grid>
              <Grid item sm={8} xs={12}>
                {categoryTitle.map((value, i) => {
                  return (
                    <Link href={`/${value}`} key={i}>
                      <a>{value}</a>
                    </Link>
                  );
                })}
              </Grid>
            </Grid>
          </div>
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
  const RealData = data.map((blog) => matter(blog));
  const ListItems = RealData.map((listItem) => listItem.data);
  let categoryList = ListItems.map((blog, i) => {
    return [blog.category, blog.title];
  });
  categoryList = Array.from(new Set(categoryList));
  console.log(categoryList);
  return {
    props: {
      categoryList: categoryList,
    },
  };
}
