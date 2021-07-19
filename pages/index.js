import React, { useCallback, useEffect, useState } from "react";
import matter from "gray-matter";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Transition } from "react-transition-group";
import SideBar from "./components/homepage/SideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    transition: "1s ease opacity",
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
  imgcenter: {
    margin: "auto",
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

const Index = ({ data }) => {
  const classes = useStyles();
  const RealData = data.map((blog) => matter(blog));
  const ListItems = RealData.map((listItem) => listItem.data);
  let categoryList = ListItems.map((blog, i) => {
    return blog.category;
  });
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    setInProp(true);
  });
  categoryList = Array.from(new Set(categoryList));
  return (
    <div
      style={{
        background: 'url("/7.jpg") no-repeat center center fixed',
        backgroundSize: "cover",
        paddingTop: 15,
      }}
    >
      <Transition timeout={duration} in={inProp}>
        {(state) => (
          <div
            className={classes.root}
            style={{
              paddingLeft: "5vw",
              paddingRight: "5vw",
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <Grid container spacing={2}>
              <Grid item sm={3} xs={12}>
                <SideBar categoryList={categoryList}></SideBar>
              </Grid>
              <Grid item sm={8} xs={12}>
                <ul className={classes.default}>
                  {ListItems.map((blog, i) => (
                    <Paper key={i}>
                      <li className={classes.default}>
                        <div>
                          <img
                            src="/8.jpg"
                            style={{
                              width: "100%",
                              height: 150,
                              objectFit: "cover",
                            }}
                          ></img>
                        </div>
                        <Link href={`/${blog.slug}`}>
                          <a>{blog.title}</a>
                        </Link>
                        <p>{blog.description}</p>
                      </li>
                    </Paper>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Index;

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
