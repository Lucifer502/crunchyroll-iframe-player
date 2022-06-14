window.addEventListener('message', async e => {

  console.log(e.data)

  let video_config_media = e.data.video_config_media;
  let listmedia = e.data.listmedia;

  let liststreams = [];

  for (let i in listmedia) {
    liststreams = listmedia[i]['streams']
  }

  for (let stream of liststreams) {
    video_mp4_array = stream.url
    setFileSize(video_mp4_array)
  }

  function setFileSize(url) {
    console.log(url)
  }
})
