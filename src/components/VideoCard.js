import React from 'react';
import { useSelector } from 'react-redux';

const VideoCard = ({ item }) => {
    const { snippet, statistics } = item;
    const { channelTitle, thumbnails, title, publishedAt } = snippet;
    const { viewCount } = statistics;

    // const channelPhotoUrl = `https://yt3.ggpht.com/${channelId}=s68-c-k-c0x00ffffff-no-rj`;

    // Function to format view count
    const formatViews = (count) => {
        if (count >= 1e9) return `${(count / 1e9).toFixed(1)}B views`;
        if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M views`;
        if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K views`;
        return `${count} views`;
    };

    // Function to format published date
    const formatPublishedDate = (date) => {
        const currentDate = new Date();
        const videoDate = new Date(date);
        const diffTime = Math.abs(currentDate - videoDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 30) {
            return `${diffDays} days ago`;
        } else if (diffDays < 365) {
            const diffMonths = Math.floor(diffDays / 30);
            return `${diffMonths} ${diffMonths > 1 ? 'months' : 'month'} ago`;
        } else {
            const diffYears = Math.floor(diffDays / 365);
            return `${diffYears} ${diffYears > 1 ? 'years' : 'year'} ago`;
        }
    };

    const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

    return (
        <div className={`${isBarOpen ? 'w-[470px] ' : 'w-[400px]'} my-2 shadow-lg bg-transparent `} >
            <img src={thumbnails.medium.url} alt="video" className="w-full rounded-xl" />
            <div className="px-5 py-2">
                <div className="font-bold text-md text-white mb-2">{title}</div>
                <div className="flex  mb-4">
                    {/* <img src={channelPhotoUrl} alt="channel" className="w-10 h-10 rounded-full mr-2" /> */}
                    <div className="text-sm">
                        <p className="text-gray-500 leading-none mb-1">{channelTitle}</p>
                        <p className="text-gray-500">{formatViews(viewCount)} • {formatPublishedDate(publishedAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
