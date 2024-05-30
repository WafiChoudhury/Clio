import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function RedditPage() {
  const location = useLocation();
  const history = useHistory();
  
  const defaultRedditPages = ['https://www.reddit.com/r/aww/comments/1e1a2c/cute_kittens_playing/'];
  const defaultSearchQuery = 'cute kittens';

  const { redditPages = defaultRedditPages, searchQuery = defaultSearchQuery } = location.state || {};

  const [embeds, setEmbeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state) {
      // Redirect to home page or set default state if location.state is not present
      history.replace({
        pathname: location.pathname,
        state: {
          redditPages: defaultRedditPages,
          searchQuery: defaultSearchQuery
        }
      });
    }

    const fetchEmbedData = async () => {
      const embedPromises = redditPages.map(async (url) => {
        try {
          const response = await fetch(`http://localhost:3001/oembed?url=${encodeURIComponent(url)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data && data.html) {
            return data;
          } else {
            throw new Error('Invalid embed data');
          }
        } catch (error) {
          console.error('Error fetching embed data:', error);
          return { error: error.message };
        }
      });
      const embedData = await Promise.all(embedPromises);
      setEmbeds(embedData);
    };

    fetchEmbedData();
  }, [redditPages, location.state, history]);

  return (
    <div>
      <h1>Reddit Results for "{searchQuery}"</h1>
      {error && <p>Error loading embeds: {error.message}</p>}
      {embeds.map((embed, index) => (
        embed.error ? (
          <p key={index}>Failed to load embed: {embed.error}</p>
        ) : (
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
