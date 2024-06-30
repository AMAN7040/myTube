export const YT_VIDEO_API = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=' + process.env.REACT_APP_API_KEY;

export const YT_SEARCH = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=';