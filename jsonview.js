(function(document) {
  if (top != this) return;
  
  var
    entities = {'<': '&lt;', '&': '&amp;', '"': '&quot;', '>': '&gt;'}
    ,reUrl = /^(?:https?):\/\/[^\s]+$/
    ,reEncode = /[<&">]/g
    ,body = document.body
    ,element = body && body.childNodes.length == 1 && document.compatMode == 'BackCompat' && body.childNodes[0]
    ,collapser = document.createElement('div')
    ,ellipsis = document.createElement('span');
  ;

  if (!element || element.nodeName != 'PRE' || !/\{|\[/.test(body.innerText.charAt(0))) return;
  
  if (document.readyState == 'interactive' || document.readyState == 'complete') {
    main();
  }
  else {
    document.addEventListener('DOMContentLoaded', main);
  }
  
  collapser.className = 'collapser';
  collapser.innerText = '-';

  ellipsis.className = 'ellipsis';
  ellipsis.innerHTML = ' &hellip; ';
  
  
  function htmlEncode(t) {
    return t.toString().replace(reEncode, function(c) { return entities[c]; });
  }
  
  function span(value, className) {
    return '<span class="' + className + '">' + htmlEncode(value) + '</span>';
  }
  
  function jsonToHTML(value) {
    var valueType = typeof value, output = "";
    if (value === null) {
      output = span('null', 'null');
    }
    else if (value instanceof Array) {
      output = array(value);
    }
    else if (valueType == 'object') {
      output = object(value);
    }
    else if (valueType == 'number') {
      output = span(value, 'num');
    }
    else if (valueType == 'string') {
      if (reUrl.test(value)) {
        output = span('"', 'string') + '<a href="' + value + '">' + htmlEncode(value) + '</a>' + span('"', 'string');
      }
      else {
        output = span('"' + value + '"', 'string');
      }
    }
    else if (valueType == 'boolean') {
      output = span(value, 'bool');
    }
    return output;
  }
  
  // Convert an array into an HTML fragment
  function array(json) {
    var prop, output = '[<ul class="array collapsible">', empty = true;
    for (prop in json) {
      empty = false;
      output += '<li>';
      output += jsonToHTML(json[prop]);
      output += '</li>';
    }
    return empty ? '[ ]' : output + '</ul>]';
  }
  
  // Convert a JSON object to an HTML fragment
  function object(json) {
    var prop, output = '{<ul class="obj collapsible">', empty = true;
    for (prop in json) {
      empty = false;
      output += '<li>';
      output += '<span class="prop">' + htmlEncode(prop) + '</span>: ';
      output += jsonToHTML(json[prop]);
      output += '</li>';
    }
    return empty ? '{ }' : output + '</ul>}';
  }
  
  function collapse(e) {
    var collapser = e.target
      ,parent = collapser.parentNode
      ,target = parent.getElementsByClassName('collapsible')[0]
      ,style = target && target.style
    ;
    if (!style) return;
    
    style.display = style.display == 'none' 
      ? parent.removeChild(parent.getElementsByClassName('ellipsis')[0]) && ''
      : parent.insertBefore(ellipsis.cloneNode(true), target) && 'none'
    ;
    collapser.innerHTML = collapser.innerHTML == '-' ? '+' : '-';
  }

  function displayObject(JSONObject) {
    if (!JSONObject) return;
    body.innerHTML = '<style type="text/css">.prop{font-weight:bold;}.null{color:red;}.bool{color:blue;}.num{color:blue;}.string{color:green;}.collapser{position:absolute;left:-1em;cursor:pointer;}li{position:relative;}li:after{content:\',\';}li:last-child:after{content:\'\';}#error{border-radius:8px;border:1px solid #970000;background-color:#F7E8E8;margin:.5em;padding:.5em;}.errormessage{font-family:monospace;}#json{font-family:monospace;font-size:.8em;}ul{list-style:none;margin:0 0 0 2em;padding:0;}h1{font-size:1.2em;}#toolbar{position:fixed;top:0;right:0;}#expandAll,#collapseAll{display:inline-block;}</style>'
        + '<div id="json">' + jsonToHTML(JSONObject) + '</div>';

    Array.prototype.forEach.call(document.selectNodes('//*[contains(concat(" ", @class, " "), " collapsible ")]/parent::li'), function(li) {
      li
        .insertBefore(collapser.cloneNode(true), li.firstChild)
        .addEventListener('click', collapse, false);
    });
  }

  function main(options) {
    options || (options = {});
    if (options.safeMethod) {
      var xhr = new XMLHttpRequest();
       xhr.onreadystatechange = function() {
          if (this.readyState == 4)
            displayObject(JSON.parse(this.responseText));
        };
        xhr.open('GET', location.href);
        xhr.send(null);
    }
    else {
      displayObject(JSON.parse(document.body.childNodes[0].innerText));
    }
  }
})(this.document);