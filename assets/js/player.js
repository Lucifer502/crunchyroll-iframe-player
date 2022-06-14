window.addEventListener('message', async e => {

  console.log(e.data)

  let video_config_media = e.data.video_config_media;
  let listmedia = e.data.listmedia;

  const liststream = listmedia['streams']
})
