function showMedias(medias) {
  var table = document.getElementById('medias');
  while (table.children.length > 1) {
    table.removeChild(table.children[table.children.length - 1]);
  }

  medias.forEach((item) => {
    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    var col1 = document.createElement('td');

    col0.innerText = item.title;
    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Download';
    button.onclick = function () {
      chrome.downloads.download({ url: item.mp3 }, function () {});
    };

    col1.appendChild(button);
    row.appendChild(col0);
    row.appendChild(col1);
    table.appendChild(row);
  });
}

chrome.runtime.onMessage.addListener(showMedias);

window.onload = function () {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (
      activeTabs
    ) {
      chrome.tabs.executeScript(activeTabs[0].id, {
        file: 'get_medias.js',
        allFrames: true,
      });
    });
  });
};
