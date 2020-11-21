var playButtons = [].slice.apply(document.getElementsByTagName('div'));

var medias = playButtons.reduce((rs, element) => {
  try {
    if (element.classList.contains('audio_play_button')) {
      var { title, dataset } = element;
      if (dataset && dataset.srcMp3 && dataset.srcOgg) {
        rs.push({
          title: title,
          mp3: dataset.srcMp3,
          ogg: dataset.srcOgg,
        });
      }
    }
  } catch (e) {
    console.error('[Medias download] error: ' + e);
  }
  return rs;
}, []);

chrome.runtime.sendMessage(medias);
