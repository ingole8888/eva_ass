import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ContentPreview = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl="https://evallo.onrender.com/"
  const baseUrl1="https://evallo.onrender.com/api/"

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${baseUrl}content/content/${id}`);
        setContent(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchContent();
  }, [id]);

  

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  return (
    <div style={{margin:"auto",width:"95%", alignContent:"center"}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div >

          <h3>Name : {content.title}</h3>
          <p>Description : {content.description}</p>
          <button onClick={() => handleRedirect(content.url)}>
            <img src={content.url} alt='content.url' className="content-image" />
          </button>

          {content.mockFile && content.mockFile.length > 0 && (content.mockFile[0].toLowerCase().endsWith('.jpg') || content.mockFile[0].toLowerCase().endsWith('.png')) ? (
            <>
              <h3 style={{ marginTop: "1rem" }}>Uploaded Notes</h3>
              <img src={`${baseUrl1}${content.mockFile[0]}`} alt={content.title} style={{ maxWidth: '100%', height: 'auto' }} />
            </>
          ) : content.mockFile && content.mockFile.length > 0 && content.mockFile[0].toLowerCase().endsWith('.pdf') ? (
            <>
              <h3 style={{ marginTop: "1rem" }}>Uploaded Notes</h3>
              <object data={`${baseUrl1}${content.mockFile[0]}`} type="application/pdf" width="100%" height="500px">
                <p>This browser does not support PDFs. Please click the button to download the PDF: <a href={`http://localhost:8080/api/${content.mockFile[0]}`} target="_blank" rel="noopener noreferrer">Download PDF</a></p>
              </object>
            </>
          ) : (
            <p>Notes not available</p>
          )}

        </div>
      )}
    </div>
  );
};

export default ContentPreview;
