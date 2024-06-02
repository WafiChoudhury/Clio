import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function TikTokPage() {
    const { videoUrls, searchQuery } = useLocation().state || { videoUrls: [], searchQuery: '' };
    const history = useHistory();
    const [embeds, setEmbeds] = useState([]);
    const location = useLocation();
    const [error, setError] = useState(null);

    const goBack = () => {
        history.goBack();
    };

    
    // useEffect(() => {

    //     const fetchEmbedData = async () => {
    //         const embedPromises = videoUrls.map(async (url) => {
    //             try {
    //                 // Extract the username and video ID from the URL
    //                 const parts = url.split('/');
    //                 const username = parts[3]; // assuming the username is always the 4th part
    //                 const videoId = parts[5]; // assuming the video ID is always the 6th part
    //                 const response = await fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${username}/video/${videoId}`);
    //                 console.log(url);
    //                 if (!response.ok) {
    //                     throw new Error(`Network response was not ok for URL: ${url}`);
    //                 }
    //                 const data = await response.json();
    //                 if (data && data.html) {
    //                     return data;
    //                 } else {
    //                     throw new Error(`Invalid embed data for URL: ${url}`);
    //                 }
    //             } catch (error) {
    //                 console.error('Error fetching embed data:', error);
    //                 return { error: `${error.message} (URL: ${url})` };
    //             }
    //         });
    //         const embedData = await Promise.all(embedPromises);
    //         setEmbeds(embedData);
    //     };

    //     fetchEmbedData();
    // }, [tiktokPages, location.state, history]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const sanitizeUrl = (url) => url.replace(/^["']|["']$/g, '');

    return (
        <div className="youtube-page">
            <div className="header">
                <button className="back-button" onClick={goBack}>
                    Back
                </button>
                <h1 className="title">TikTok {searchQuery} Reviews</h1>
            </div>
            <div className="video-grid">
                {videoUrls.map((video, index) => (
                    
                    <div key={index} className="video-item">
                        <div className="thumbnail-container">
                            <iframe
                                src={`https://www.tiktok.com/embed/${video}`}
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="hey"
                                className="thumbnail"
                            ></iframe>
                        </div>
                        <a
                            href={`google.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-title-link"
                        >
                            <h3 className="video-title">video</h3>
                        </a>
                    </div>
                ))}
            </div>
            <style jsx>{`
        .youtube-page {
          padding: 20px 40px;
          background-color: #121212;
          color: #e0e0e0;
          min-height: 100vh;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 20px;
        }

        .back-button {
          position: absolute;
          left: 20px;
          border-radius: 4px;
          padding: 8px 16px;
          font: 600 16px Inter, sans-serif;
          border: none;
          background-color: #bb86fc;
          color: #000;
          cursor: pointer;
        }

        .title {
          font-size: 24px;
          font: 600 24px Inter, sans-serif;
          color: #e0e0e0;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .video-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background-color: #1e1e1e;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        .thumbnail-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 450px;
          overflow: hidden;
        }

        .thumbnail {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }

        .video-title {
          margin-top: 10px;
          color: #e0e0e0;
          font: 600 16px Inter, sans-serif;
          text-decoration: none; /* Remove underline */
          transition: color 0.3s;
        }

        .video-title:hover {
          color: #ff0000;
        }

        .click-to-watch {
          font: 600 16px Inter, sans-serif;
        }

        /* Ensure links do not have underlines */
        .video-item a {
          text-decoration: none;
          color: inherit;
        }

        .video-item a:hover {
          text-decoration: none;
        }
      `}</style>
        </div>
    );
}

export default TikTokPage;
