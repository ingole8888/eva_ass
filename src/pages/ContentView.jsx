import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ContentView.css';

const ContentView = () => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');

    const baseUrl="https://evallo.onrender.com/"
    const baseUrl1="https://evallo.onrender.com/api/"

    useEffect(() => {
        fetchContents();
    }, []);

    useEffect(() => {
        fetchFilteredContents();
    }, [searchKeyword]);

    const fetchContents = async () => {
        try {
            const res = await axios.get(`${baseUrl}content`);
            setContents(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const fetchFilteredContents = async () => {
        try {
            const res = await axios.get(`${baseUrl}content/content?search=${searchKeyword}`);
            setContents(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const handleRedirect = (url) => {
        window.location.href = url;
    };

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    return (
        <div className="content-wrapper">
            <h2>Content List</h2>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="content-container">
                    {contents.map(content => (
                        <div className="content-card" key={content._id}>
                            <h3>Name : {content.title}</h3>
                            <Link to={`/content/${content._id}`}>View details</Link>
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
                                        <p>This browser does not support PDFs. Please click the button to download the PDF: <a href={`${baseUrl1}${content.mockFile[0]}`} target="_blank" rel="noopener noreferrer">Download PDF</a></p>
                                    </object>
                                </>
                            ) : (
                                <p>Notes not available</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentView;
