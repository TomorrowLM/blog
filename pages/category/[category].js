import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import CodeBlock from "../../lib/CodeBlock";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { useRouter } from "next/router";
import { Head } from "next/document";
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
const category = () => {
  const classes = useStyles();
  const router = useRouter();
  const category = router.query.category;
  const [value, setValue] = useState("");
  return (
    <div
      style={{
        background: 'url("/7.jpg") no-repeat center center fixed',
        backgroundSize: "cover",
        width:'100vw',
        height:'100vh'
      }}
    >
      <div className={classes.root}>
        
      </div>
    </div>
  );
};

export default category;
