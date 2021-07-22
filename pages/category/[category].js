import matter from "gray-matter";
import "markdown-navbar/dist/navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import SideBar from "../components/homepage/SideBar";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  default: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  card: {
    width: "45%",
    float: "left",
    margin: "0 0 5% 5%",
  },
  media: {
    height: 140,
  },
  link: {
    textDecoration: "auto",
    color: "#848383f5",
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
const category = ({ categoryList }) => {
  const classes = useStyles();
  const router = useRouter();
  const category = router.query.category;
  const [inProp, setInProp] = useState(false);
  categoryList = categoryList || [];
  let categoryTitle = categoryList.filter((value, index) => {
    if (value[0] === category) {
      return value;
    }
  });
  categoryTitle = categoryTitle.map((value, index) => {
    return [value[1], value[2]];
  });
  console.log(categoryTitle);
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
                    <Card className={classes.card} key={i}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image="/2.jpg"
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2"  style={{textDecoration:"auto"}}>
                            <a href={`/${value[0]}`} key={i} className={classes.link}>
                              {value[0]}
                            </a>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {value[1]}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                      </CardActions>
                    </Card>
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
    return [blog.category, blog.title, blog.description];
  });
  categoryList = Array.from(new Set(categoryList));
  return {
    props: {
      categoryList: categoryList,
    },
  };
}
