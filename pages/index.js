import React from "react";
import Head from "next/head";
import matter from "gray-matter";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  default: {
    listStyle: "none",
  },
}));

const Index = ({ data, title, description }) => {
  const RealData = data.map((blog) => matter(blog));
  const ListItems = RealData.map((listItem) => listItem.data);
  const classes = useStyles();
  return (
    <> 
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{title}</title>
      </Head> 
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={3} xs={12}>
            <Paper className={classes.paper}>
              <Avatar alt="Remy Sharp" src="/img/head.jpg" />
            </Paper>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Paper className={classes.paper}>
              <ul>
                {ListItems.map((blog, i) => (
                  <li key={i} className={classes.default}>
                    <Link href={`/${blog.slug}`}>
                      <a>{blog.title}</a>
                    </Link>
                    <p>{blog.description}</p>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </div>
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
