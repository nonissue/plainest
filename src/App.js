import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Nav, Loading, InstaGrid, ImageView } from "./components";
import "./App.css";

const variants = {
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1
    }
  },
  exit: {
    opacity: 0
    // x: -1000
  }
};

const variants2 = {
  enter: {
    opacity: 1,
    x: 0
  },
  exit: {
    opacity: 0
    // x: 1000
  }
};

function About() {
  return (
    <motion.div
      className="about"
      initial="exit"
      animate="enter"
      enter="enter"
      exit="exit"
      variants={variants}
    >
      <p>Plainest.site is cooked up by @christiandy && @nonissue</p>
    </motion.div>
  );
}

// home page
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const res2 = await axios("/.netlify/functions/posts-read-all");
      const fetchedPosts = res2.data[0].data.posts;
      console.log(fetchedPosts);
      // const res = await axios("/.netlify/functions/instagram");
      setPosts(fetchedPosts);
      setLoading(false);

      // const res2 = await axios("/.netlify/functions/posts-read-all");
      // console.log(res2.data[0]);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {location.pathname === "/" ? (
        ""
      ) : (
        <div className="back">
          <Link to="/">{"<"}</Link>
        </div>
      )}
      <header className="App-header">
        <Link to="/">
          <h1>plain site</h1>
        </Link>
        <a href="https://instagram.com/plain.site">
          <h3>plain.site</h3>
        </a>
        <Nav />
      </header>
      <div>
        {/* <AnimatePresence exitBeforeEnter intial={false}> */}
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/">
              <motion.div
                initial={false}
                animate="enter"
                enter="enter"
                exit="exit"
                variants={variants}
              >
                {loading ? <Loading /> : <InstaGrid posts={posts} />}
              </motion.div>
            </Route>
            <Route path="/images/:id">
              <motion.div
                initial={false}
                animate="enter"
                enter="enter"
                exit="exit"
                variants={variants2}
              >
                <ImageView posts={posts} />
              </motion.div>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
