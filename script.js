if(!window.highlightSelection) {
  highlightSelection = {};
}


highlightSelection.Selector = {};


highlightSelection.Selector.getSelected = function () {
  var text = '';
  if(window.getSelection) {
    text = window.getSelection();
    highlight('#FFCC00');
  } else if (document.getSelection) {
    text = document.getSelection();
    highlight('#FFCC00');
  } else if (document.selection)  {
         text = document.selection.createRange().text;
         highlight('#FFCC00');
  }

  return text;

};


function highlight(colour) {
  var range,
  sel;

  if (window.getSelection) {
    try {
      if(!document.execCommand("BackColor", false, colour)) {
        makeEditableAndHighlight(colour);
      }
    } catch (ex) {
      makeEditableAndHighlight(colour);
    }
  } else if(document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.execCommand("BackColor", false, colour);
  }
}

function makeEditableAndHighlight(colour) {
  var range,
  sel = highlightSelection.Selector.getSelected;

if(sel.rangeCount && sel.getRangeAt) {
  range = sel.getRangeAt(0);
}

document.designMode = "on";
if(range) {
  sel.removeAllRanges();
  sel.addRange();
}

if(!document.execCommand("HiliteColor", false, colour)) {
  document.execCommand("BackColor", false, colour);


}

document.designMode = "off";


}


var count = 1;


function ready(f) {/in/.test(document.readyState) ? setTimeout ('ready('+ f + ')', 9) : f();}


ready(function () {
  if(window.addEventListener) {
    var ie = false;
    document.body.addEventListener("mouseup", function() {
      selections(ie);
    });

  } else if (window.attachEvent) {
    var ie = true;
    document.body.attachEvent("onmouseup", function() {
      selections(ie);
    });
  }

  function selections(ie) {
    var string = highlightSelection.Selector.getSelected();
    if (string !== '') {
     var selectionTitle = document.createElement('h3');
     selectionTitle.className = 'heading2 selectionSpacer';
     var title = document.createTextNode('Selection' + count + ':');
     selectionTitle.appendChild(title);


     var selectionDiv = document.createElement('div');
     selectionDiv.className = 'selection';
     var text = document.createTextNode(string);
     selectionDiv.appendChild(text);
      


     if(ie) {
       document.querySelectorAll(".selections")[0].appendChild(selectionTitle);
       document.querySelectorAll(".selections")[0].appendChild(selectionDiv)
     }
      else {
        document.getElementsByClassName("selections")[0].appendChild(selectionTitle);
        document.getElementsByClassName("selections")[0].appendChild(selectionDiv);
      }

      count++;


    }
  }
});