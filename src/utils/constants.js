export const YT_VIDEO_API = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&type=video&maxResults=50&regionCode=IN&key=' + process.env.REACT_APP_API_KEY + '&videoCategoryId=';

export const YT_SEARCH = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=';

export const YT_WATCH = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20liveStreamingDetails&key=' +process.env.REACT_APP_API_KEY + '&id=';

export const YT_SUBSCRIPTION = 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=' +process.env.REACT_APP_API_KEY + '&id=';

export const YT_COMMENT = (videoId, pageToken = '') => 
    'https://www.googleapis.com/youtube/v3/commentThreads?key=' +process.env.REACT_APP_API_KEY + '&textFormat=plainText&part=snippet&videoId=' + videoId + '&maxResults=15&pageToken=' +  pageToken;

export const YT_COMMENT_POST = 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=' +process.env.REACT_APP_API_KEY;

export const YT_CATEGORY ='https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=' +process.env.REACT_APP_API_KEY;

export const YT_RELATED = (tags, channelId) => 
    'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=' + tags + '&type=video&channelId=' + channelId + '&key=' +process.env.REACT_APP_API_KEY;

export const YT_MULTIVIDEO = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key=' +process.env.REACT_APP_API_KEY+ '&id=';

export const YT_SEARCH_VD = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=' +process.env.REACT_APP_API_KEY + '&q=';

export const YT_PLAYLIST_D = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&key=' +process.env.REACT_APP_API_KEY + '&id=';

export const YT_LIVE_CHAT = 'https://youtube.googleapis.com/youtube/v3/liveChat/messages?part=snippet%2CauthorDetails&maxResults=40&key=' +process.env.REACT_APP_API_KEY + '&liveChatId=';

export const YT_CHANNEL_PLAYLIST = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&key=' +process.env.REACT_APP_API_KEY + '&playlistId=';    