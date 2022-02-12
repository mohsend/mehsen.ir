var audio = document.getElementById('podcast-player');
var des = document.getElementById('description');
/* Make timestamps clickable links */
des.innerHTML = des.innerHTML.replace(/\d\d:\d\d/g, function (x) {
  var a = x.split(':');
  var seconds;
  if (a.length == 2) {
    seconds = (+a[0]) * 60 + (+a[1]); 
  } else if (a.length == 3) {
    seconds = (+a[0]) * 3600 + (+a[1]) * 60 + (+a[2]); 
  }
  return '<a href="#' + seconds + '">' + x + '</a>';
});
/* Skip to time using hash in url on change */
window.addEventListener("hashchange", function () {
  audio.currentTime = parseInt(window.location.hash.slice(1));
  audio.play();
});
/* Skip to time using hash in url on load */
if (window.location.hash) {
  audio.load();
  audio.oncanplay = function() {
    audio.currentTime = parseInt(window.location.hash.slice(1));
  };
}

/* Add target="_blank" to external links */
window.onload = function targetBlank() {
  /* remove subdomain of current site's url and setup regex */
  var internal = location.host.replace("www.", "");
      internal = new RegExp(internal, "i");
      
  var a = document.getElementsByTagName('a'); /* then, grab every link on the page */
  for (var i = 0; i < a.length; i++) {
    var href = a[i].host;
    if( !internal.test(href) ) { 
      a[i].setAttribute('target', '_blank');
    }
  }
};