import React, { useCallback, useEffect, useState, memo } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import FolderIcon from "@material-ui/icons/Folder";
import NestedList from "./NestedList";
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
const SideBar = memo((props) => {
  const classes = useStyles();
  const categoryList = props.categoryList || [];
  console.log(3);
  return (
    <>
      <Paper className={classes.paper}>
        <Avatar alt="liming" src="/head.jpg" className={classes.imgcenter} />
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
              <Link href={`/category/${encodeURIComponent(categoryItem)}`}>
                <a>{categoryItem}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Paper>
    </>
  );
});
export default SideBar;
