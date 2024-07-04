export const YT_VIDEO_API = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&type=video&maxResults=50&regionCode=IN&key=' + process.env.REACT_APP_API_KEY + '&videoCategoryId=';

export const YT_SEARCH = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=';

export const YT_WATCH = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=' +process.env.REACT_APP_API_KEY + '&id=';

export const YT_SUBSCRIPTION = 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=' +process.env.REACT_APP_API_KEY + '&id=';

export const YT_COMMENT = (videoId, pageToken = '') => 
    'https://www.googleapis.com/youtube/v3/commentThreads?key=' +process.env.REACT_APP_API_KEY + '&textFormat=plainText&part=snippet&videoId=' + videoId + '&maxResults=100&pageToken=' +  pageToken;

export const YT_COMMENT_POST = 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=' +process.env.REACT_APP_API_KEY;

export const YT_CATEGORY ='https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=' +process.env.REACT_APP_API_KEY;