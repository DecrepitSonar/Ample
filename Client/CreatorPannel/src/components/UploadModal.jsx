import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

const UploadModal = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles(prevFiles => 
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleUpload = () => {
    // Handle file upload logic here
    console.log('Uploading files:', selectedFiles);
    // Reset and close after upload
    setSelectedFiles([]);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-lg mr-4">
                  <CloudArrowUpIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <Dialog.Title className="text-xl font-bold text-secondary-900">
                    Upload Files
                  </Dialog.Title>
                  <p className="text-secondary-500 text-sm">
                    Upload your files by dragging & dropping or selecting them
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-secondary-400 hover:text-secondary-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? 'border-primary-500 bg-primary-50' : 'border-secondary-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CloudArrowUpIcon className="h-12 w-12 mx-auto text-secondary-400" />
              <p className="mt-4 text-secondary-900 font-medium">
                Drag & drop your files here
              </p>
              <p className="mt-1 text-secondary-500">
                or
              </p>
              <label className="mt-4 inline-block">
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileSelect}
                />
                <span className="px-4 py-2 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700">
                  Select Files
                </span>
              </label>
              <p className="mt-2 text-sm text-secondary-500">
                Supported file types: All files are supported
              </p>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-secondary-900 mb-3">Selected Files</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-secondary-50 p-2 rounded-lg"
                    >
                      <div className="flex items-center">
                        <DocumentIcon className="h-5 w-5 text-secondary-500" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-secondary-900">{file.name}</p>
                          <p className="text-xs text-secondary-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-secondary-400 hover:text-secondary-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-secondary-700 hover:text-secondary-900"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
                className={`px-4 py-2 rounded-lg ${
                  selectedFiles.length > 0
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-secondary-100 text-secondary-400 cursor-not-allowed'
                }`}
              >
                Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UploadModal; 