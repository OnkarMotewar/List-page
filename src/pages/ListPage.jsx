// src/pages/ListPage.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ListPage.css";

const ListPage = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      title: title,
      body: body,
      userId: 1,
      id: Date.now(),
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", newItem)
      .then((response) => {
        setItems([response.data, ...items]);
        setTitle("");
        setBody("");
      })
      .catch((error) => {
        console.error("Error creating new item:", error);
      });
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditedTitle(item.title);
    setEditedBody(item.body);
  };

  const handleSaveEdit = (id) => {
    const updatedItem = { title: editedTitle, body: editedBody, id };

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item))
    );

    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedItem)
      .then(() => {
        alert("Item updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        alert("Failed to update item.");
      });

    setEditingItemId(null);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));

      axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => {
          alert("Item deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          alert("Failed to delete item.");
        });
    }
  };

  return (
    <div>
      <h1>List of Items</h1>

      {/* Form to add a new item */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add New Item</button>
      </form>

      <ul>
        {items.map((item) =>
          editingItemId === item.id ? (
            <li key={item.id}>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(item.id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </li>
          ) : (
            <li key={item.id}>
              <Link to={`/detail/${item.id}`} state={{ item }}>
                {item.title}
              </Link>
              <div className="buttons-container">
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ListPage;
