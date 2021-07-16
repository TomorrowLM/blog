import React, { useCallback, useEffect, useState } from "react";
import matter from "gray-matter";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import FolderIcon from "@material-ui/icons/Folder";
// import NestedList from "./homepage/NestedList";

function SideBar(props) {
  console.log(props);
  return (
    <>
      <h1>1</h1>
    </>
  );
}

export default SideBar;

export async function getInitialProps() {
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  console.log('1qwe2');

  return {
    props: {
      posts: "12",
    },
  };
}
