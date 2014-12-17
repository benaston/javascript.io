window.stackHeads = function (e) {
  var fixedHeaders = document.getElementsByClassName('fixedheader');
  var panel = document.getElementById('bookmark-list-panel');
  for (var i = 0; i < fixedHeaders.length; i++) {
    var currentHeader = fixedHeaders[i];
    var nextHeader = fixedHeaders[i + 1];
    var placeholder = getPrevNext(currentHeader)[0];
    var currentScrollPosY = panel.scrollTop;
    var placeholderPosY = findPosY(placeholder);

    if (currentScrollPosY > placeholderPosY) {
      //if our scroll position in the panel is father than the placeholder of the current header's position in the DOM...
      if (typeof nextHeader != 'undefined') {
        //If this isn't the last header.
        var distanceToNextHeader = findPosY(nextHeader) - currentScrollPosY;
        //the difference between our scroll position and the header's placeholder's position
        if (distanceToNextHeader < currentHeader.offsetHeight) { //offsetHeight ===  height of element inc padding, border
          //if we have less distance between the placeholder of the next element and the top of of the page than the height of the current header, we push the header up so it doesn't overlap.
          currentHeader.style.position = "fixed";
          currentHeader.style.top = '-' + (currentHeader.offsetHeight - distanceToNextHeader) + 'px';

        }
        else {
          //if there is another header, but we have room
          //console.log(header
          placeholder.style.height = currentHeader.offsetHeight + 'px';
          currentHeader.style.position = "fixed";
          currentHeader.style.top = "0px";
        }
      } else {

        placeholder.style.height = currentHeader.offsetHeight + 'px';
        //if there isn't another header
        currentHeader.style.position = "fixed";
        currentHeader.style.top = "0px";
      }


    } else {
      placeholder.style.height = '0px';
      //if we haven't gotten to the header yet
      currentHeader.style.position = 'static';
      currentHeader.style.removeProperty('top');
    }
  }

  return true;
};
function getPrevNext(el) {
  var els = document.getElementsByTagName('*');
  for (var j = 0; j < els.length; j++) {
    if (els[j] == el) {
      return [els[j - 1], els[j + 1]];
    }
  }
  return false;
}

function findPosY(element) {
  var posY = 0;
  if (element.offsetParent) {//offsetParent is the closest parent that has position:relative or position:absolute or the body of the page
    while (1) {
      posY += element.offsetTop;
      if (!element.offsetParent)
        break;
      element = element.offsetParent;
    }
  } else if (element.y) {
    posY += element.y;
  }

  return posY;
}