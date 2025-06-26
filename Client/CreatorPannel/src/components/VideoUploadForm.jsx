import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  VideoCameraIcon,
  PhotoIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const VideoUploadForm = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'Tutorial',
    'Vlog',
    'Gaming',
    'Music',
    'Education',
    'Entertainment',
    'Tech',
    'Other'
  ];

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      videoFile,
      coverImage,
      title,
      category
    });
  };

  return (
    <div className="flex-1 overflow-hidden bg-secondary-50 h-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full py-8">
        <Card className="h-full">
          <CardHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-secondary-900">Upload Video</h1>
                <p className="text-secondary-500">Share your video with your audience</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-secondary-600 hover:text-secondary-900"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 py-6">
              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Video File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-secondary-300 rounded-lg">
                  <div className="space-y-1 text-center">
                    <VideoCameraIcon className="mx-auto h-12 w-12 text-secondary-400" />
                    <div className="flex text-sm text-secondary-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                        <span>Upload a video</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="sr-only"
                          onChange={handleVideoChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-secondary-500">
                      MP4, WebM up to 2GB
                    </p>
                    {videoFile && (
                      <p className="text-sm text-secondary-900 mt-2">
                        Selected: {videoFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  Cover Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-secondary-300 rounded-lg">
                  {coverImagePreview ? (
                    <div className="relative">
                      <img
                        src={coverImagePreview}
                        alt="Cover preview"
                        className="max-h-48 rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setCoverImage(null);
                          setCoverImagePreview(null);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-secondary-400" />
                      <div className="flex text-sm text-secondary-600">
                        <label className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                          <span>Upload a cover image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleCoverImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-secondary-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-secondary-900 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-secondary-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter video title"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-secondary-900 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!videoFile || !title || !category}
                >
                  Upload Video
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoUploadForm; 