
export default function readFile (fileUrl) {

    let xhr = null
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      // eslint-disable-next-line
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    const okStatus = document.location.protocol === 'file' ? 0 : 200
    xhr.open('GET', fileUrl, false)
    xhr.overrideMimeType('text/html;charset=utf-8')
    xhr.send(null)
    return (xhr.status === okStatus ? xhr.responseText : null)
  }
