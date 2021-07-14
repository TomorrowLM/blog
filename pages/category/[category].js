import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import CodeBlock from "../../lib/CodeBlock";
import Head from "next/head";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
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
const Blog = (req, res) => {
  const classes = useStyles();
  console.log(req.url.query.category);
  const [value, setValue] = useState("");
  const handleChange = function (event) {
    console.log(event.target.value);
    setValue(event.target.value);
    event.preventDefault();
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description"></meta>
        <title></title>
      </Head>
      <div className={classes.root}>
        <Grid container spacing={6}>
          <Grid item sm={3} xs={12} style={{ paddingBottom: 0 }}>
            <input type="text" value={value} onChange={handleChange} />
          </Grid>
          <Grid item sm={9} xs={12}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default Blog;
