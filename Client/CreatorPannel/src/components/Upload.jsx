import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  CloudArrowUpIcon, 
  XMarkIcon, 
  MusicalNoteIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const GENRES = [
  'Hip Hop',
  'Pop',
  'R&B',
  'Rock',
  'Electronic',
  'Jazz',
  'Classical',
  'Country',
  'Latin',
  'Other'
];

const Upload = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [pendingUploads, setPendingUploads] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload an image file (JPEG, PNG, or GIF)');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size should be less than 5MB');
      return false;
    }
    return true;
  };

  const validateAudioFile = (file) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-m4a'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload an audio file (MP3, WAV, or M4A)');
      return false;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('Audio file size should be less than 50MB');
      return false;
    }
    return true;
  };

  const handleImageSelect = (selectedFile) => {
    setError('');
    if (selectedFile && validateImageFile(selectedFile)) {
      setImageFile(selectedFile);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAudioSelect = (selectedFile) => {
    setError('');
    if (selectedFile && validateAudioFile(selectedFile)) {
      setAudioFile(selectedFile);
      if (!fileName) {
        setFileName(selectedFile.name.replace(/\.[^/.]+$/, '')); // Set filename without extension
      }
    }
  };

  const handleDrop = (e, fileType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (fileType === 'image') {
      handleImageSelect(droppedFile);
    } else {
      handleAudioSelect(droppedFile);
    }
  };

  const handleAddTrack = (e) => {
    e.preventDefault();
    if (!imageFile || !audioFile || !fileName.trim() || !genre) {
      setError('Please fill in all fields and upload both image and audio files');
      return;
    }

    const newTrack = {
      id: Date.now(),
      imageFile,
      audioFile,
      imagePreview,
      fileName,
      genre,
      status: 'pending'
    };

    setPendingUploads(prev => [...prev, newTrack]);
    
    // Reset form
    setImageFile(null);
    setAudioFile(null);
    setImagePreview('');
    setFileName('');
    setGenre('');
    setError('');
  };

  const removeTrack = (trackId) => {
    setPendingUploads(prev => prev.filter(track => track.id !== trackId));
  };

  const handleSubmitAll = async () => {
    if (pendingUploads.length === 0) {
      setError('Add at least one track to upload');
      return;
    }

    // Here you would typically send all tracks to your backend
    console.log('Submitting all tracks:', pendingUploads);
    
    // Clear all pending uploads after successful submission
    setPendingUploads([]);
  };

  const clearImageFile = () => {
    setImageFile(null);
    setImagePreview('');
    setError('');
  };

  const clearAudioFile = () => {
    setAudioFile(null);
    setError('');
  };

  return (
    <div className="h-screen flex flex-col bg-secondary-50">
      {/* Fixed Header */}
      <div className="p-6 bg-secondary-50">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-secondary-600 hover:text-secondary-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Form Section */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <CloudArrowUpIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-secondary-900">Add Track</h1>
                <p className="text-secondary-500">Fill in track details</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleAddTrack} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Cover Image
                  </label>
                  {!imageFile ? (
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        dragActive ? 'border-primary-500 bg-primary-50' : 'border-secondary-300'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={(e) => handleDrop(e, 'image')}
                    >
                      <CloudArrowUpIcon className="mx-auto h-8 w-8 text-secondary-400" />
                      <p className="mt-2 text-sm text-secondary-900">
                        Drag and drop image, or
                      </p>
                      <label className="mt-1 inline-block">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageSelect(e.target.files[0])}
                        />
                        <span className="text-primary-600 hover:text-primary-500 cursor-pointer text-sm">
                          browse
                        </span>
                      </label>
                      <p className="mt-1 text-xs text-secondary-500">
                        JPEG, PNG, GIF (max 5MB)
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="aspect-square rounded-lg overflow-hidden bg-secondary-100">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={clearImageFile}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-secondary-50"
                      >
                        <XMarkIcon className="h-5 w-5 text-secondary-500" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Audio Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Audio File
                  </label>
                  {!audioFile ? (
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        dragActive ? 'border-primary-500 bg-primary-50' : 'border-secondary-300'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={(e) => handleDrop(e, 'audio')}
                    >
                      <MusicalNoteIcon className="mx-auto h-8 w-8 text-secondary-400" />
                      <p className="mt-2 text-sm text-secondary-900">
                        Drag and drop audio, or
                      </p>
                      <label className="mt-1 inline-block">
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => handleAudioSelect(e.target.files[0])}
                        />
                        <span className="text-primary-600 hover:text-primary-500 cursor-pointer text-sm">
                          browse
                        </span>
                      </label>
                      <p className="mt-1 text-xs text-secondary-500">
                        MP3, WAV, M4A (max 50MB)
                      </p>
                    </div>
                  ) : (
                    <div className="relative bg-secondary-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <MusicalNoteIcon className="h-8 w-8 text-secondary-500 mr-3" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-secondary-900 truncate">
                            {audioFile.name}
                          </p>
                          <p className="text-xs text-secondary-500">
                            {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={clearAudioFile}
                          className="ml-4 p-1 hover:bg-secondary-200 rounded"
                        >
                          <XMarkIcon className="h-5 w-5 text-secondary-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="fileName" className="block text-sm font-medium text-secondary-700">
                    Track Name
                  </label>
                  <input
                    type="text"
                    id="fileName"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Enter track name"
                  />
                </div>

                <div>
                  <label htmlFor="genre" className="block text-sm font-medium text-secondary-700">
                    Genre
                  </label>
                  <select
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="mt-1 block w-full rounded-md border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Select a genre</option>
                    {GENRES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!imageFile || !audioFile || !fileName.trim() || !genre}
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add to Upload List
                </button>
              </div>
            </form>
          </div>

          {/* Pending Uploads Section */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-secondary-900">Pending Uploads</h2>
                <p className="text-secondary-500">
                  {pendingUploads.length} {pendingUploads.length === 1 ? 'track' : 'tracks'} ready to upload
                </p>
              </div>
              {pendingUploads.length > 0 && (
                <button
                  onClick={handleSubmitAll}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Upload All
                </button>
              )}
            </div>

            {pendingUploads.length === 0 ? (
              <div className="text-center py-12 text-secondary-500">
                <MusicalNoteIcon className="h-12 w-12 mx-auto mb-4 text-secondary-400" />
                <p>No tracks added yet</p>
                <p className="text-sm">Fill out the form to add tracks</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingUploads.map(track => (
                  <div 
                    key={track.id}
                    className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg"
                  >
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={track.imagePreview}
                        alt={track.fileName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-secondary-900 truncate">
                            {track.fileName}
                          </h3>
                          <p className="text-sm text-secondary-500">
                            {track.genre}
                          </p>
                          <p className="text-xs text-secondary-500 mt-1">
                            Audio: {track.audioFile.name}
                          </p>
                        </div>
                        <button
                          onClick={() => removeTrack(track.id)}
                          className="p-1 hover:bg-secondary-200 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5 text-secondary-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload; 