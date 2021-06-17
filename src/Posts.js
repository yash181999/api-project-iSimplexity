import React, { useState } from "react";
import TextTruncate from "react-text-truncate";
import "./App.css";

function Posts({ posts }) {
  const [readMoreId, setReadMoreId] = useState();
  const [showCommentId, setShowCommentId] = useState();

  return (
    <>
      {posts.length > 0 && <h1>Posts</h1>}
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div key={post.id} className="card post" style={{ width: "100%" }}>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                {readMoreId !== post.id ? (
                  <TextTruncate
                    line={4}
                    element="span"
                    truncateText="…"
                    text={post.body}
                    textTruncateChild={
                      <a
                        onClick={() => setReadMoreId(post.id)}
                        style={{ cursor: "pointer", color: "blue" }}
                        href="#"
                      >
                        Read More
                      </a>
                    }
                  />
                ) : (
                  <p>
                    {post.body}
                    <span
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => setReadMoreId(null)}
                    >
                      show less
                    </span>
                  </p>
                )}
              </div>

              <p>Comments</p>

              <a
                onClick={() =>
                  setShowCommentId(showCommentId === post.id ? null : post.id)
                }
                style={{ cursor: "pointer", color: "blue" }}
                href="#"
              >
                {showCommentId === post.id ? "Hide Comment" : "Show Comments"}
              </a>

              {showCommentId === post.id &&
                post.comments.map((comment) => {
                  return (
                    <div class="card">
                      <div class="card-header">{comment.name}</div>
                      <div class="card-body">
                        <blockquote class="blockquote mb-0">
                          <p style={{ fontSize: "14px" }}>{comment.body}</p>
                          <footer class="blockquote-footer">
                            <cite title="Source Title">{comment.email}</cite>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </>
  );
}

export default Posts;
