import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { About } from "./pages";
import { Nav, Loading, InstaGrid, ImageView } from "./components";
import "./App.css";

const variants = {
  enter: {
    opacity: 1,
    transition: {
      delay: 1
    }
  },
  exit: {
    opacity: 1
  }
};

const variants2 = {
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

// home page
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const res2 = await axios("/.netlify/functions/posts-read-latest");
      const fetchedPosts = res2.data.data.posts;
      console.log(fetchedPosts);
      setPosts(fetchedPosts);
    };

    fetchData();

    // Fake timeout to ensure loading shows
    // Could be bad though as if the contents isnt actually loaded in time
    // it will be displayed
    // TODO possible solution? https://humble.dev/creating-a-nice-loading-button-with-react-hooks
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
