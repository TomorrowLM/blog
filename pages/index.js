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
    padding: theme.spacing(10),
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: 10,
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
  link: {
    textDecoration: "auto",
    color: "rgb(56 13 166)",
    display: "block",
    textAlign: "center",
    fontSize:"25px"
  },
  linkDescription:{
    display: "block",
    textAlign: "center",
    fontSize:"20px",
    margin:0,
    padding:"10px 0",
    marginBottom:"20px"
  },
  mediaSearch:{
    [theme.breakpoints.down('sm')]: {
      paddingLeft: "5vw",
      paddingRight: "5vw",
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: "5vw",
      paddingRight: "5vw",
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: "13vw",
      paddingRight: "13vw",
    },
  }
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
  console.log(2);
  return (
    <div
      style={{
        background: 'url("/7.jpg") no-repeat center center fixed',
        backgroundSize: "cover",
        paddingTop: 15,
      }}
      className={classes.mediaSearch}
    >
      <Transition timeout={duration} in={inProp}>
        {(state) => (
          <div
            className={classes.root}
            style={{

              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <Grid container spacing={3}>
              <Grid item sm={3} xs={12}>
                <SideBar categoryList={categoryList}></SideBar>
              </Grid>
              <Grid item sm={9} xs={12}>
                <ul className={classes.default}>
                  {ListItems.map((blog, i) => (
                    <Paper key={i}>
                      <li className={classes.default}>
                        <div>
                          <img
                            src="/8.jpg"
                            style={{
                              width: "100%",
                              height: 250,
                              objectFit: "cover",
                            }}
                          ></img>
                        </div>
                        <a
                          href={`/${blog.slug}`}
                          className={classes.link}
                        >
                          {blog.title}
                        </a>
                        <p className={classes.linkDescription}>{blog.description}</p>
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
  console.log(1);
  return {
    props: {
      data: data,
    },
  };
}
