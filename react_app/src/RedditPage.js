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
          <h1 className="brand-name">clio</h1>
      {error && <p>Error loading embeds: {error.message}</p>}
      {embeds.map((embed, index) => (
        embed && embed.html ? (
          <div key={index}>
            <iframe
              title={`Reddit Embed ${index}`}
              srcDoc={embed.html}
              style={{ width: '100%', height: '350px', border: 'none' }}
            />
          </div>
        ) : (
          <p key={index}>Failed to load embed</p>
        )
      ))}
       <style jsx>{`
        .container {
          background-color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 14px 34px 59px;
        }
        @media (max-width: 991px) {
          .container {
            padding: 0 20px;
          }
        }
        .header-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        @media (max-width: 991px) {
          .header-container {
            flex-wrap: wrap;
            margin-bottom: 10px;
          }
        }
        .brand-name {
          color: rgba(164, 3, 204, 0.63);
          font: 600 64px Inter, sans-serif;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .brand-name {
            font-size: 40px;
          }
        }
        .search-button {
          border-radius: 8px;
          background-color: #000;
          color: #fff;
          padding: 20px 9px;
          font: 700 24px Inter, sans-serif;
        }
        .main-title {
          color: #000;
          text-align: center;
          font: 600 24px Inter, sans-serif;
          margin-top: 9px;
        }
        .image-section {
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 516px;
          margin-top: 8px;
          width: 1001px;
          max-width: 100%;
          padding: 80px 37px 28px;
          border: 6px solid rgba(165, 159, 157, 1);
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        }
        @media (max-width: 991px) {
          .image-section {
            padding: 0 20px;
          }
        }
        .main-image {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .image-form {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          background-color: #fff;
          border: 1px solid rgba(2, 4, 15, 1);
          border-radius: 7px;
          box-shadow: 0px 0.129px 0.386px rgba(0, 0, 0, 0.11), 0px 0.687px 1.545px rgba(0, 0, 0, 0.13);
          margin-top: 340px;
          padding: 17px 18px;
        }
        @media (max-width: 991px) {
          .image-form {
            max-width: 100%;
            flex-wrap: wrap;
            margin-top: 40px;
            padding: 10px 12px;
          }
        }
        .form-input {
          flex: 1;
          font-family: Inter, sans-serif;
        }
        .form-image {
          width: 34px;
          aspect-ratio: 1;
          object-fit: auto;
        }
        .note {
          color: #000;
          text-align: center;
          font: 600 24px Inter, sans-serif;
          margin-top: 60px;
        }
        @media (max-width: 991px) {
          .note {
            margin-top: 40px;
          }
        }
        .platforms-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
          max-width: 1223px;
          gap: 20px;
          margin-top: 36px;
          color: #ffffff;
          font: 700 24px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .platforms-container {
            max-width: 100%;
          }
        }
        .platform-button {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          padding: 26px 16px;
          flex: 1;
          text-align: center;
          cursor: pointer;
        }
        .platform-tiktok {
            
          background-color: #000;
        }
        .platform-youtube {
          background-color: #e71414;
        }
        .platform-amazon {
          background-color: #24416d;
        }
        .platform-reddit {
          background-color: #ff511b;
        }
        @media (max-width: 991px) {
          .platform-button {
            width: 100%;
            padding: 15px 10px;
            margin-bottom: 10px;
          }
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>
    </div>
    
  );
}

export default RedditPage;
