import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function RedditPage() {
  const location = useLocation();
  const { redditPages, searchQuery } = location.state || { redditPages: [], searchQuery: '' };
  const [embeds, setEmbeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmbedData = async () => {
      const embedPromises = redditPages.map(url =>
        fetch(`http://localhost:3001/oembed?url=${encodeURIComponent(url)}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch(error => {
            console.error('Error fetching embed data:', error);
            setError(error);
            return null;
          })
      );
      const embedData = await Promise.all(embedPromises);
      setEmbeds(embedData);
    };

    fetchEmbedData();
  }, [redditPages]);

  return (
    <div>
      <h1>Reddit Results for "{searchQuery}"</h1>
      {error && <p>Error loading embeds: {error.message}</p>}
      {embeds.map((embed, index) => (
        embed && embed.html ? (
          <div key={index}>
            <iframe
              title={`Reddit Embed ${index}`}
              srcDoc={embed.html}
              style={{ width: '100%', height: '250px', border: 'none' }}
            />
          </div>
        ) : (
          <p key={index}>Failed to load embed</p>
        )
      ))}
    </div>
  );
}

export default RedditPage;
