import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../redux/booksSlice';
import { fetchAuthors } from '../redux/authorsSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css';

function UpdateBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { items: authors } = useSelector(state => state.authors);

  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    publication_year: new Date().getFullYear(),
    available_copies: 1,
    author_id: ''
  });

  useEffect(() => {
    dispatch(fetchAuthors());
    if (location.state?.book) {
      const book = location.state.book;
      setFormData({
        title: book.title,
        isbn: book.isbn,
        publication_year: book.publication_year,
        available_copies: book.available_copies,
        author_id: book.author_id
      });
    }
  }, [dispatch, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateBook({
      id: location.state.book.id,
      data: {
        ...formData,
        publication_year: parseInt(formData.publication_year, 10),
        available_copies: parseInt(formData.available_copies, 10),
        author_id: parseInt(formData.author_id, 10)
      }
    }));
    navigate('/');
  };

  if (!location.state?.book) {
    navigate('/');
    return null;
  }

  return (
    <div className="form-container">
      <h1>✏️ Update Book</h1>

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>ISBN *</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Publication Year *</label>
          <input
            type="number"
            name="publication_year"
            value={formData.publication_year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Available Copies *</label>
          <input
            type="number"
            name="available_copies"
            min="1"
            value={formData.available_copies}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author *</label>
          <select
            name="author_id"
            value={formData.author_id}
            onChange={handleChange}
            required
          >
            <option value="">Select an author</option>
            {(authors || []).map(author => (
              <option key={author.id} value={author.id}>
                {author.first_name} {author.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Update Book</button>
          <button type="button" onClick={() => navigate('/')} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBook;
