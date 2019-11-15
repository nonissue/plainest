import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Nav, Loading, InstaGrid, ImageView } from "./components";
import "./App.css";

// const postsMock = [
//   {
//     id: 1,
//     src:
//       "https://scontent.cdninstagram.com/vp/92f8fe785011d88c2c7794a7426c7cef/5E4A38B6/t51.2885-15/sh0.08/e35/s640x640/73420571_106993513973031_4835225455312547158_n.jpg?_nc_ht=scontent.cdninstagram.com",
//     images: []
//   },
//   {
//     id: 2,
//     src:
//       "https://scontent.cdninstagram.com/vp/be7f720fa62ac643b2289b110597f4f8/5E6AD647/t51.2885-15/sh0.08/e35/s640x640/69866223_443000699651907_1782646635031253506_n.jpg?_nc_ht=scontent.cdninstagram.com",
//     images: []
//   },
//   {
//     id: 3,
//     src:
//       "https://scontent.cdninstagram.com/vp/e9ab3033ca4bc864126f94d21f7ca41c/5E6992D9/t51.2885-15/sh0.08/e35/p640x640/70403278_484571632385717_2204518790079096263_n.jpg?_nc_ht=scontent.cdninstagram.com",
//     images: []
//   },
//   {
//     id: 4,
//     src:
//       "https://scontent.cdninstagram.com/vp/64d19898552bdc7355a3d2b6ddacc1a1/5E4BE232/t51.2885-15/sh0.08/e35/s640x640/69509476_131147648208311_5072908818272680388_n.jpg?_nc_ht=scontent.cdninstagram.com",
//     images: []
//   }
// ];
// import isLocalHost from "./utils/isLocalHost";

function About() {
  return (
    <div className="about">
      <p>Plainest.site is cooked up by @christiandy && @nonissue</p>
    </div>
  );
}

// home page
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/.netlify/functions/instagram");
      setPosts(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
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
        {/* <button onClick={changePosts}>Test</button> */}
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/">
              {loading ? <Loading /> : <InstaGrid posts={posts} />}
            </Route>
            <Route path="/images" component={ImageView} />
            <Route path="/about" component={About} />
          </Switch>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
