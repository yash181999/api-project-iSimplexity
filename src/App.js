import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TextTruncate from "react-text-truncate";
import Posts from "./Posts";

function App() {
  const url =
    "https://jsonkeeper.com/b/SCZQ";

  const [data, setData] = useState();
  const [userIds, setUserIds] = useState([]);
  const [allEmails, setAllEmails] = useState([]);
  const [allPostsSorted, setAllPostsSorted] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [posts, setPosts] = useState([]);
  async function getData(url) {
    await axios.get(url).then((res) => {
      const result = res.data;
      setData(result);
    });
  }

  useEffect(() => {
    return getData(url);
  }, []);

  useEffect(() => {
    if (data) {
      getAllUserIds(data);
    }
  }, [data]);

  function getAllUserIds(data) {
    if (data) {
      const userIdArr = Object.keys(data).map((obj) => {
        return obj;
      });

      setUserIds(userIdArr);
    }

    return userIds;
  }

  console.log(userIds);

  const getPosts = (data, userId) => {
    if (data && userIds.includes(userId)) {
      const posts = data[userId]?.posts;

      return posts;
    }
  };

  function sortPostsReverseChronological(data, userId) {
    if (data) {
      setAllPostsSorted([]);
      let posts = getPosts(data, userId);

      return setPosts(
        posts
          ? posts?.sort((postOne, postTwo) => (postOne < postTwo ? 1 : -1))
          : []
      );
    }
    return null;
  }

  function sortAllPostsReverseChronological(data) {
    if (data && userIds) {
      setPosts([]);
      let allPosts = [];
      userIds.forEach((id) =>
        data[id]["posts"].forEach((post) => allPosts.push(post))
      );
      setAllPostsSorted(allPosts.sort((a, b) => (a.title < b.title ? 1 : -1)));
    }
  }

  function getAllEmails(data) {
    if (data) {
      setAllPostsSorted([]);
      setPosts([]);
      let emails = [];
      userIds.forEach((id) =>
        data[id].posts.forEach((post) =>
          post.comments.forEach((comment) => {
            emails.push(comment.email);
          })
        )
      );
      setAllEmails(emails);
      return emails;
    }
  }

  return !data ? (
    <h1>Loading</h1>
  ) : (
    <div className="App">
      <div className="navBar">
        <button onClick={() => getAllEmails(data)} className=" btn btn-primary">
          Get Emails
        </button>
        <button
          onClick={() => sortAllPostsReverseChronological(data)}
          className="btn btn-primary"
        >
          Get All Post Sorted Order
        </button>

        <div>
          <input
            placeholder="Enter Id"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            type="number"
          />

          <button
            className="btn btn-secondary"
            onClick={() => sortPostsReverseChronological(data, selectedId)}
          >
            Get Post
          </button>
        </div>
      </div>

      {posts.length > 0 && posts && <Posts posts={posts}></Posts>}
      <Posts posts={allPostsSorted}></Posts>

      {allEmails.length > 0 && <h2>Email List</h2>}

      <ul className="emails list-group emails">
        {allEmails.length > 0 &&
          allEmails.map((mail, index) => {
            return (
              <li
                key={index}
                className=" email list-group-item list-group-item-primary"
              >
                {mail}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
