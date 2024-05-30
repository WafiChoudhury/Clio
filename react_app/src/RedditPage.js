import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// Define the RedditPage component
function RedditPage() {
  // Hooks to access location and history for navigation and state management
  const location = useLocation();
  const history = useHistory();

  // Default values for Reddit pages and search query
  const defaultRedditPages = ['https://www.reddit.com/r/aww/comments/1e1a2c/cute_kittens_playing/'];
  const defaultSearchQuery = 'cute kittens';

  // Destructure redditPages and searchQuery from location.state, using defaults if not present
  const { redditPages = defaultRedditPages, searchQuery = defaultSearchQuery } = location.state || {};

  // State to hold the embed data and any errors
  const [embeds, setEmbeds] = useState([]);
  const [error, setError] = useState(null);

  // useEffect hook to perform actions when the component mounts or when dependencies change
  useEffect(() => {
    // Check if location.state is not present
    if (!location.state) {
      // Redirect to the current page with default state if location.state is missing
      history.replace({
        pathname: location.pathname,
        state: {
          redditPages: defaultRedditPages,
          searchQuery: defaultSearchQuery
        }
      });
    }

    // Function to fetch embed data for the Reddit pages
    const fetchEmbedData = async () => {
      // Create an array of promises to fetch embed data for each Reddit page URL
      const embedPromises = redditPages.map(async (url) => {
        try {
          // Fetch the embed data from the local server endpoint
          const response = await fetch(`http://localhost:3001/oembed?url=${encodeURIComponent(url)}`);
          // Check if the response is not OK (status code not in the 200 range)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Parse the response data as JSON
          const data = await response.json();
          // Check if the data contains valid HTML for embedding
          if (data && data.html) {
            return data;
          } else {
            throw new Error('Invalid embed data');
          }
        } catch (error) {
          // Log the error and return an object with the error message
          console.error('Error fetching embed data:', error);
          return { error: error.message };
        }
      });
      // Wait for all promises to resolve and set the embed data state
      const embedData = await Promise.all(embedPromises);
      setEmbeds(embedData);
    };

    // Call the function to fetch embed data
    fetchEmbedData();
  }, [redditPages, location.state, history]);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <button
        onClick={() => history.goBack()}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          fontSize: '16px',
          cursor: 'pointer',
          
     
        }}
      >
        Back
      </button>
      <h1>Reddit Results for "{searchQuery}"</h1>
      {error && <p>Error loading embeds: {error.message}</p>}
      {embeds.map((embed, index) => (
        // If there was an error fetching the embed, display an error message
        embed.error ? (
          <p key={index}>Failed to load embed: {embed.error}</p>
        ) : (
          // Otherwise, display the embed HTML inside an iframe
          <div key={index}>
            <iframe
              title={`Reddit Embed ${index}`}
              srcDoc={embed.html}
              style={{ width: '100%', height: '300px', border: 'none' }}
            />
          </div>
        )
      ))}
    </div>
  );
}

export default RedditPage;
