import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import matter from "gray-matter";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import FolderIcon from "@material-ui/icons/Folder";
import NestedList from "../components/homepage/NestedList";
import Fade from "@material-ui/core/Fade";
import Slide from '@material-ui/core/Slide';
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

const Index = ({ data, title, description }) => {
  const classes = useStyles();
  const RealData = data.map((blog) => matter(blog));
  const ListItems = RealData.map((listItem) => listItem.data);
  let categoryList = ListItems.map((blog, i) => {
    return blog.category;
  });
  const [checked, setChecked] = React.useState(true);
  categoryList = Array.from(new Set(categoryList));
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{title}</title>
      </Head>
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <div
          className={classes.root}
          style={{ paddingLeft: "5vw", paddingRight: "5vw"}}
        >
          <Grid container spacing={2}>
            <Grid item sm={3} xs={12}>
              <Paper className={classes.paper}>
                <Avatar
                  alt="liming"
                  src="/head.jpg"
                  className={classes.imgcenter}
                />
                <p>TomorrowLM</p>
                <span>热爱</span>
                <div className={classes.root} style={{ marginTop: 10 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} sm={4}>
                      <span>文章</span>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <span>标签</span>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <span>分类</span>
                    </Grid>
                  </Grid>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  href="https://github.com/TomorrowLM"
                  size="small"
                  style={{
                    width: "80%",
                    marginTop: 20,
                    fontVariant: "all-small-caps",
                  }}
                >
                  <GitHubIcon />
                  github
                </Button>
              </Paper>
              <Paper className={classes.paper} style={{ marginTop: 10 }}>
                <NestedList></NestedList>
              </Paper>
              <Paper className={classes.paper} style={{ marginTop: 10 }}>
                <p
                  style={{
                    textAlign: "left",
                    paddingLeft: 14,
                    margin: 0,
                    marginTop: 10,
                  }}
                >
                  <FolderIcon></FolderIcon>
                  <span style={{ verticalAlign: "super" }}>分/类</span>
                </p>
                <ul className={classes.default}>
                  {categoryList.map((categoryItem, i) => (
                    <li className={classes.default} key={i}>
                      <Link
                        href={`/category/${encodeURIComponent(categoryItem)}`}
                      >
                        <a>{categoryItem}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Paper>
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
      </Slide>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const siteData = await import(`../config.json`);
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
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}
