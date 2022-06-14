window.addEventListener('message', async e => {

  console.log(e.data)

  const r = { 0: '720p', 1: '1080p', 2: '480p', 3: '360p', 4: '240p' };

  let streamrgx = /_,(\d+.mp4),(\d+.mp4),(\d+.mp4),(\d+.mp4),(\d+.mp4),.*?m3u8/;
  let streamrgx_three = /_,(\d+.mp4),(\d+.mp4),(\d+.mp4),.*?m3u8/;
  let video_config_media = e.data.video_config_media;
  let listmedia = e.data.listmedia;
  let video_mp4_array = [];

  let liststreams = [];

  for (let i in listmedia) {
    liststreams = listmedia[i]['streams']
  }

  for (let stream of liststreams) {
    if (stream.format == 'adaptive_hls') {
      video_mp4_array = mp4ListFromStream(stream.url)
      setFileSize(video_mp4_array)
    }
  }

  function setFileSize(url) {
    for (let id in r) {
      let http = new XMLHttpRequest()
      http.onload = () => {
        let fileSize = http.getResponseHeader('content-length');
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let i = parseInt(Math.floor(Math.log(fileSize) / Math.log(1024)));
        let return_fileSize = (fileSize / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
        return console.log(`Tamaño de: ${r[id]} (${return_fileSize})`);
      }
      http.open('HEAD', url[id], true)
      http.send(null)
    }
  }

  function mp4ListFromStream(url) {
    const cleanUrl = url.replace(url.split('/')[2], 'fy.v.vrv.co');
    const res = [];
    for (let i in r)
      if (streamrgx_three.test(cleanUrl) && i <= 2)
        res.push(cleanUrl.replace(streamrgx_three, `_$${(parseInt(i)+1)}`))
    else
      res.push(cleanUrl.replace(streamrgx, `_$${(parseInt(i)+1)}`))
    return res;
  }
})
