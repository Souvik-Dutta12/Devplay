import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const TAG_OPTIONS = [
    'Shopping',
    'Music',
    'Movies',
    'Live',
    'Gaming',
    'News',
    'Sports',
    'Courses',
    'Fashion & Beauty',
    'Podcasts',
];

const UploadVideo = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tag: '',
        video: null,
        thumbnail: null,
    });

    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'thumbnail') {
            const file = files[0];
            setFormData({ ...formData, thumbnail: file });
            setThumbnailPreview(URL.createObjectURL(file));
        } else if (name === 'video') {
            const file = files[0];
            setFormData({ ...formData, video: file });
            setVideoPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('title', formData.title);
        uploadData.append('description', formData.description);
        uploadData.append('tag', formData.tag);
        uploadData.append('video', formData.video);
        uploadData.append('thumbnail', formData.thumbnail);

        console.log('Uploading...', formData);
        alert('Upload simulated!');
        // TODO: Connect to backend
    };

    return (
        <div className="min-h-screen w-full bg-base-200 p-5 md:p-10 text-base-content">
            <h1 className="text-3xl font-bold mb-10 text-center">Upload a New Video</h1>
            <span>
                <Link to={'/'} className='text-base-content/60 text-sm hover:text-base-content hover:text-md duration-300'>
                <i className="ri-arrow-left-long-fill"></i> Back
                </Link>
            </span>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full mx-auto">
                {/* Left: Form Inputs */}
                <div className="flex flex-col gap-6 w-full">
                    {/* Title */}
                    <div className="form-control flex flex-col gap-1">
                        <label className="label text-2xl font-semibold">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter video title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input input-bordered input-primary w-1/2 text-lg"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className='flex flex-col md:flex-row gap-5 md:gap-0 w-full items-center '>
                        <div className="form-control flex flex-col gap-1 w-full">
                            <label className="label font-semibold text-2xl">Description</label>
                            <textarea
                                name="description"
                                placeholder="Describe your video..."
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                className="textarea textarea-bordered textarea-primary resize-none w-full md:w-4/5 text-lg"
                                required
                            />
                        </div>

                        {/* Tag Dropdown */}
                        <div className="form-control flex gap-1  mr-10">
                            <label className="label font-semibold text-2xl ">Select Tag</label>
                            <select
                                name="tag"
                                value={formData.tag}
                                onChange={handleChange}
                                className="select select-bordered select-primary text-lg cursor-pointer w-50"
                                required
                            >
                                <option className='text-lg' value="">-- Choose a tag --</option>
                                {TAG_OPTIONS.map((tag, i) => (
                                    <option className='text-lg' key={i} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    
                    <div className='flex flex-col md:flex-row gap-3 md:gap-0 mt-10 justify-between '>
                        {/* Video Upload */}
                        <div className="form-control flex flex-col w-full md:w-1/2 gap-5 ">

                            {/* Video Preview */}
                            {videoPreview && (
                                <div>
                                    <p className="font-semibold mb-2">Video Preview:</p>
                                    <video
                                        src={videoPreview}
                                        controls
                                        className="w-full md:w-[80%] h-auto rounded-lg shadow-lg"
                                    />
                                </div>

                            )}
                            <div className=' flex gap-1'>
                                <label className="label font-semibold text-2xl">Upload Video</label>
                                <input
                                    type="file"
                                    name="video"
                                    accept="video/*"
                                    onChange={handleChange}
                                    className=" text-lg file-input file-input-bordered file-input-success"
                                    required
                                />
                            </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div className="form-control items-end flex flex-col gap-5 w-full md:w-1/2">

                            {/* Thumbnail Preview */}
                            {thumbnailPreview && (
                                <div className='flex flex-col '>
                                    <p className="font-semibold ml-0 md:ml-37 mb-2">Thumbnail Preview:</p>
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail Preview"
                                        className="rounded-lg shadow-lg w-full  md:w-[80%] ml-auto h-auto object-cover"
                                    />
                                </div>
                            )}
                            <div className='flex gap-1'>
                                <label className="label font-semibold text-2xl">Thumbnail</label>
                                <input
                                    type="file"
                                    name="thumbnail"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="file-input text-lg file-input-bordered file-input-info"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-35 w-1/3 mx-auto">
                        Upload Video
                    </button>
                </div>

                {/* Right: Previews */}

            </form>
        </div>
    );
};

export default UploadVideo;
