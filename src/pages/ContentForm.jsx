import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContentForm.css'; 

const ContentForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        mockFile: null  
    });

    const baseUrl="https://evallo.onrender.com/"

    const { title, description, url, mockFile } = formData;

    const onChange = e => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, mockFile: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const formDataObject = new FormData();
            formDataObject.append('title', title);
            formDataObject.append('description', description);
            formDataObject.append('url', url);
            formDataObject.append('mockFile', mockFile);
            
            const res = await axios.post(`${baseUrl}content/create`, formDataObject);
            console.log(res.data);
            toast.success("Content added successfully"); // Use toast instead of alert
        } catch (error) {
            console.error(error.response.data);
            toast.error("Failed to add content");
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={onSubmit} className="form">
                <h2 className="form-title">Add Content</h2>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={onChange} className="form-input" placeholder="Title" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" id="description" name="description" value={description} onChange={onChange} className="form-input" placeholder="Description" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="url" className="form-label">File Link</label>
                    <input type="text" id="url" name="url" value={url} onChange={onChange} className="form-input" placeholder="File Link" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="mockFile" className="form-label">Upload Notes (add Image/PDF only)</label>
                    <input type="file" id="mockFile" name="mockFile" onChange={onChange} className="form-input" />
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
            <ToastContainer /> 
        </div>
    );
};

export default ContentForm;
