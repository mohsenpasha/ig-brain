function exportTableToExcel(tableID, filename = ''){
      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
      
      // Specify file name
      filename = filename?filename+'.xls':'excel_data.xls';
      
      // Create download link element
      downloadLink = document.createElement("a");
      
      document.body.appendChild(downloadLink);
      
      if(navigator.msSaveOrOpenBlob){
          var blob = new Blob(['\ufeff', tableHTML], {
              type: dataType
          });
          navigator.msSaveOrOpenBlob( blob, filename);
      }else{
          // Create a link to the file
          downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
      
          // Setting the file name
          downloadLink.download = filename;
          
          //triggering the function
          downloadLink.click();
      }
  }

var tab_title = '';
function display_h1 (results){
  h1=results;
  document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
}
chrome.tabs.query({active: true}, function(tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  console.log(tab.id)
  // chrome.tabs.executeScript(tab.id, {
  //   code: 'window.location.href = "https://socialblade.com/instagram/user/instagram";'
  // }, display_h1);
  // chrome.tabs.executeScript(tab.id, {
  //   code: "document.querySelector('.dd-selected').click()"
  // }, display_h1);
  // chrome.tabs.executeScript(tab.id, {
  //   code: "document.querySelector('.dd-option input[value=instagram]').parentNode.click()"
  // }, display_h1);
  // chrome.tabs.executeScript(tab.id, {
  //   code: 'document.querySelector("#SearchInput").value="instagram"'
  // }, display_h1);
  // chrome.tabs.executeScript(tab.id, {
  //   code: "document.querySelector('.search-button').click()"
  // }, display_h1);
  
});
function get_data(page){
  var out = []
  cook = {}
  chrome.cookies.getAll({
    domain: ".socialblade.com"
  },
    function (cookie) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", 'https://socialblade.com/instagram/user/' + page, false );
      for(i = 0;i < cookie.length;i++){
        xmlHttp.setRequestHeader(cookie[i].name,cookie[i].value);
        // cook[cookie[i].name] = cookie[i].value
      }
      xmlHttp.send( null );
      li = []
       if(li.length == 0){
          ti = {'Id':page}

          li.push(ti)

        }
      var parser = new DOMParser();
      var doc = parser.parseFromString(xmlHttp.responseText, "text/html");
      // grade = doc.querySelector('#socialblade-user-content').querySelector('div').querySelector('div').querySelector('div').innerHTML
      // grade = grade.replaceAll(' ','').replaceAll('\n','')
      YouTubeUserTopInfo = doc.querySelectorAll('.YouTubeUserTopInfo')
      for(i = 0;i < YouTubeUserTopInfo.length;i++){
        ti = {}
        try{
          key = YouTubeUserTopInfo[i].querySelector('.YouTubeUserTopLight').innerHTML
          value = YouTubeUserTopInfo[i].querySelectorAll('span:not(.hint--left)')[1].innerHTML.replaceAll(' ','').replaceAll('\n','')
          ti[key] = value
          li.push(ti)
          // console.log(key + ' : ' + value)
        }
        catch(err){
        }
      }
      // console.log(doc.querySelector('#socialblade-user-content').children[2].children)
      socialblade_user_content_children = doc.querySelector('#socialblade-user-content').children[2].children
      for(i = 0;i < socialblade_user_content_children.length;i++){
        ti = {}
        value = socialblade_user_content_children[i].querySelectorAll('p')[0].innerHTML
        key = socialblade_user_content_children[i].querySelectorAll('p')[1].innerHTML
        value = value.replace(value.substr(value.indexOf('<sup '),value.indexOf('</sup>')),'').replaceAll(' ','').replaceAll('\n','')
        // console.log(value.innerHTML.slice('<sup'))
        // value = value.removeChild(value.querySelector('sup')).querySelector('span').innerHTML
        ti[key] = value
        console.log(li)
        console.log(li.length)
       
        li.push(ti)
      }
      console.log(li)
      for(i = 0;i < li.length;i++){

        table = document.querySelector('#tblData') 
        if(table.querySelectorAll('tr').length != li.length){
          tr = document.createElement('tr')
          th = document.createElement('th')
          th.innerHTML = Object.keys(li[table.querySelectorAll('tr').length])[0]
          tr.appendChild(th)
          table.appendChild(tr)
        }
        tr = document.createElement('tr')
        td = document.createElement('td')
        td.innerHTML = li[i][Object.keys(li[i])[0]]
        table.querySelectorAll('tr')[i].appendChild(td)
      }
      table = document.querySelector('#tblData2')

      if(table.querySelectorAll('tr').length == 0){
        // tr = document.createElement('tr')
        // td = document.createElement('td')
        // td.innerHTML = 'Id'
        // tr.appendChild(td)
        for(x = 0;x < li.length;x++){
        td = document.createElement('td')
          td.innerHTML = Object.keys(li[x])[0]
          console.log()
          console.log(li[x].key)
          tr.appendChild(td)
        }
        table.appendChild(tr)
      }
      tr = document.createElement('tr')
      for(x = 0;x < li.length;x++){
        td = document.createElement('td')
        td.innerHTML = li[x][Object.keys(li[x])[0]]
        tr.appendChild(td)
      }
      table.appendChild(tr)
      document.querySelector('.button-box').classList.remove('display-none')

        // else{
        // }

      // Array.prototype.push.apply(out, li);
      // return li
      // console.log(media_upload)
      
  });
  // return out
}
// console.log(get_data('yoosefj2'))
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
document.querySelector('.export').onclick = ()=>{exportTableToExcel('tblData2')}

document.querySelector('.submit').onclick = action
function action(){
  document.querySelector('.hint-text').classList.add('display-none')
  document.querySelector('.button-box').classList.add('display-none')

  document.querySelector('.title').classList.add('display-none')
  table = document.querySelector('table')
  table.innerHTML = ''
  list = document.querySelector('textarea').value.split('\n')
  for(i = 0;i < list.length;i++){
    get_data(list[i])
    // tr = document.createElement('tr')
    // for(x = 0;x < data.length;x++){
    //   td = document.createElement('td')
    //   if(table.querySelector('tr').length == 0){
    //     td.innerHTML = data[x].key
    //   }
    //   else{
    //     td.innerHTML = data[x].value
    //   }
    //   tr.appendChild(td)
    // }
    // table.appendChild(tr)
  }
}