/**
 * Updates the text within an HTML element.
 *
 * @param {String} text String being sent to HTML element.
 * @param {String} htmlID The ID of an html element.
 */
function sendTextToHTML(text, htmlID) {
    document.getElementById(htmlID).innerHTML = text
}

function loadFile(file, callBack) {
    var reader = new FileReader()
    reader.onload = callBack
    reader.readAsBinaryString(file)
}
/*
function loadImage(src, callBack) {
    var reader = new FileReader()
    var image = new Image()
    image.onload = callBack
    reader.onload = (e) => {
        image.src = reader.result
    }
    reader.readAsDataURL(src);
}
*/

function loadImage(src, callBack) {
    var image = new Image();
    image.onload = (ev) => {
        callBack(ev);
    }
    image.src = src;
}

function loadServerFile(filePath, callBack) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
      callBack(result);
    }
    return result;
  }