import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        // Validate the URL
        if (!originalUrl) {
            setError('Please enter a valid URL');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/shorten', { originalUrl });
            setShortUrl(`http://localhost:5000/${response.data.shortUrl}`);
        } catch (error) {
            console.error('Error shortening the URL', error);
            setError('Failed to shorten the URL. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Enter URL"
                    required
                />
                <button type="submit">Shorten</button>
            </form>
            {error && <p className="error">{error}</p>}
            {shortUrl && (
                <div className="short-url">
                    <h2>Shortened URL:</h2>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </div>
            )}
        </div>
    );
}

export default App;