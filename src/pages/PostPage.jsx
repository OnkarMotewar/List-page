import React, { useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function PostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]); // State for storing multiple tasks
  const [response, setResponse] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      body: body,
      userId: 1, // Optional, based on API requirements
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post response:", data);
        setResponse(data); // Store the response to show feedback
        setTasks((prevTasks) => [...prevTasks, data]); // Add new task to the list
        setTitle(""); // Clear the input fields
        setBody("");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  return (
    <div className="post-container">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="response">
          <h2>Post Created Successfully!</h2>
          <p>Post ID: {response.id}</p>
          <p>Title: {response.title}</p>
          <p>Body: {response.body}</p>
        </div>
      )}

      <div className="task-list">
        <h2>All Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong>: {task.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;
