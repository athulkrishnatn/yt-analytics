//@ts-ignore


export default function extractYourTubeInfo(url) {
    //extract video ID
    const videoMatch = url.match(/[?&]v=([^&]+)/);
    const videoId = videoMatch ? videoMatch[1] : null;

    //extract time paramenter (in seconds)
    const timeMatch = url.match(/[?&]t=(\d+)/);
    const time = timeMatch ? parseInt(timeMatch[1]) : 0;

    return{
        videoId,
        time
    };
}
