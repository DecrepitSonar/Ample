import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DocumentTextIcon,
  CloudArrowUpIcon,
  VideoCameraIcon,
  PlayIcon,
  EllipsisVerticalIcon,
  ClockIcon,
  EyeIcon,
  MusicalNoteIcon,
  HeartIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

const Uploads = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Getting Started with React',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      duration: '12:34',
      views: '1.2k',
      uploadDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      duration: '15:45',
      views: '856',
      uploadDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Building Modern UIs',
      thumbnail: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      duration: '8:20',
      views: '2.1K',
      uploadDate: '3 days ago'
    },
    {
      id: 4,
      title: 'CSS Grid Masterclass',
      thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      duration: '12:15',
      views: '943',
      uploadDate: '5 days ago'
    },
    {
      id: 5,
      title: 'State Management Deep Dive',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      duration: '20:00',
      views: '1.5K',
      uploadDate: '1 day ago'
    }
  ];

  const tracks = [
    {
      id: 1,
      title: 'Summer Vibes',
      artist: 'DJ Cool',
      coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      genre: 'Electronic',
      plays: '3.4k',
      duration: '3:45'
    },
    {
      id: 2,
      title: 'Midnight Jazz',
      artist: 'Sarah Williams',
      coverArt: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      duration: '4:20',
      plays: '1.8K',
      uploadDate: '3 days ago',
      genre: 'Jazz'
    },
    {
      id: 3,
      title: 'Urban Beat',
      artist: 'Mike Johnson',
      coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      duration: '2:55',
      plays: '3.1K',
      uploadDate: '5 days ago',
      genre: 'Hip Hop'
    },
    {
      id: 4,
      title: 'Acoustic Dreams',
      artist: 'Emily Davis',
      coverArt: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      duration: '3:30',
      plays: '956',
      uploadDate: '1 week ago',
      genre: 'Acoustic'
    },
    {
      id: 5,
      title: 'Electric Soul',
      artist: 'David Brown',
      coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      duration: '4:15',
      plays: '1.5K',
      uploadDate: '2 days ago',
      genre: 'Soul'
    }
  ];

  const quickActions = [
    {
      name: 'Upload Audio',
      icon: CloudArrowUpIcon,
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600',
      description: 'Upload any type of file',
      link: '/upload'
    },
    {
      name: 'Upload Video',
      icon: VideoCameraIcon,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      description: 'Upload video content',
      link: '/upload-video'
    }
  ];

  const handleQuickAction = (action) => {
    if (action.link) {
      navigate(action.link);
    }
  };

  const VideoCard = ({ video }) => (
    <Card className="w-72 mr-4 cursor-pointer group">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center rounded-t-lg">
          <PlayIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium text-secondary-900 line-clamp-2">
            {video.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <EllipsisVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-2 flex items-center text-xs text-secondary-500 space-x-4">
          <div className="flex items-center">
            <EyeIcon className="h-4 w-4 mr-1" />
            {video.views}
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            {video.uploadDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TrackCard = ({ track }) => (
    <Card className="w-72 mr-4 cursor-pointer group">
      <div className="relative">
        <img 
          src={track.coverArt} 
          alt={track.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center rounded-t-lg">
          <PlayIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
        </div>
        <div className="absolute top-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
          {track.genre}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-secondary-900 line-clamp-1">
              {track.title}
            </h3>
            <p className="text-xs text-secondary-500 mt-1">{track.artist}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <EllipsisVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-secondary-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MusicalNoteIcon className="h-4 w-4 mr-1" />
              {track.plays}
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {track.duration}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <HeartIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ArrowPathIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 overflow-hidden bg-secondary-50 h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full py-8">
        <Card className="h-full">
          <CardHeader className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold text-secondary-900">My Uploads</h1>
            <p className="text-secondary-500">Manage and view all your uploaded content in one place</p>
          </CardHeader>
          
          {videos.length > 0 ? (
            <ScrollArea className="h-[calc(100%-5rem)]">
              <div className="p-6 space-y-8">
                {/* Quick Actions */}
                <div>
                  <h2 className="text-lg font-medium text-secondary-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    {quickActions.map((action) => (
                      <Button
                        key={action.name}
                        variant="outline"
                        className="flex items-center p-4 h-auto"
                        onClick={() => handleQuickAction(action)}
                      >
                        <div className={`p-3 rounded-lg ${action.bgColor} ${action.textColor}`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <div className="ml-4 text-left">
                          <p className="text-sm font-medium text-secondary-900">{action.name}</p>
                          <p className="text-xs text-secondary-500">{action.description}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Recent Videos Section */}
                <div>
                  <h2 className="text-lg font-medium text-secondary-900 mb-4">Recent Videos</h2>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex pb-4">
                      {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>

                {/* Recent Tracks Section */}
                <div>
                  <h2 className="text-lg font-medium text-secondary-900 mb-4">Recent Tracks</h2>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex pb-4">
                      {tracks.map((track) => (
                        <TrackCard key={track.id} track={track} />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="p-6 flex-1 flex items-center justify-center">
              <div className="text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-secondary-400" />
                <h3 className="mt-2 text-sm font-medium text-secondary-900">No content</h3>
                <p className="mt-1 text-sm text-secondary-500">Get started by uploading your content</p>
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {quickActions.map((action) => (
                      <Button
                        key={action.name}
                        variant="outline"
                        className="flex items-center p-4 h-auto"
                        onClick={() => handleQuickAction(action)}
                      >
                        <div className={`p-3 rounded-lg ${action.bgColor} ${action.textColor}`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <div className="ml-4 text-left">
                          <p className="text-sm font-medium text-secondary-900">{action.name}</p>
                          <p className="text-xs text-secondary-500">{action.description}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Uploads; 