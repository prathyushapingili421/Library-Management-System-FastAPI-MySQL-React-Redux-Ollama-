// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../redux/booksSlice';
import { fetchAuthors } from '../redux/authorsSlice';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: books, loading } = useSelector((state) => state.books);
  const { items: authors } = useSelector((state) => state.authors);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAuthors());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      dispatch(deleteBook(id));
    }
  };

  const getAuthorName = (authorId) => {
    const author = authors.find((a) => a.id === authorId);
    return author ? `${author.first_name} ${author.last_name}` : 'Unknown';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-container">
      <header className="header">
        <h1>📚 Library Management System</h1>
        <div className="header-buttons">
          <button onClick={() => navigate('/create')} className="btn btn-primary">
            + Add New Book
          </button>
          <button onClick={() => navigate('/chat')} className="btn btn-secondary">
            💬 AI Chat
          </button>
        </div>
      </header>

      <div className="books-grid">
        {books.length === 0 ? (
          <div className="no-books">
            <p>No books available. Add your first book!</p>
          </div>
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {getAuthorName(book.author_id)}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Year:</strong> {book.publication_year}</p>
              <p><strong>Available:</strong> {book.available_copies} copies</p>
              <div className="card-actions">
                <button
                  onClick={() => navigate('/update', { state: { book } })}
                  className="btn btn-edit"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="btn btn-delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
