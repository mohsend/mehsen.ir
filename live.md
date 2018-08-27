---
layout: page
title: پخش زنده
---
<div id="stream" style="text-align: center;">
لطفا صبور باشید...
</div>


<script>
var status_url = 'http://server.mehsen.ir/status-json.xsl';

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
    if ("withCredentials" in xmlhttp) {
      xmlhttp.open("GET", url, true);
    } else if (typeof XDomainRequest != "undefined") {
      xmlhttp = new XDomainRequest();
      xmlhttp.open("GET", url);
    } else {
      throw new Error('CORS not supported');
    }
    xmlhttp.send();
}

String.prototype.toFaDigit = function() {
    return this.replace(/\d+/g, function(digit) {
        var ret = '';
        for (var i = 0, len = digit.length; i < len; i++) {
            ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
        }
        return ret;
    });
};

ajax_get(status_url, function(data) {
    if (data["icestats"]["source"]) {
        var started_milis_ago = Date.now() - Date.parse(data["icestats"]["source"]["stream_start_iso8601"]);
            var html = "<p>" + "در حال پخش زنده!" + "</p>"; 
        html += '<audio controls preload="none"><source src="' + data["icestats"]["source"]["listenurl"] + '"></audio>';
        html += "<p>" + "تعداد شنوندگان: " + '<span id = "listeners">' + data["icestats"]["source"]["listeners"].toString().toFaDigit() + '</span>' + " نفر" + "</p>";
        html += "<p>" + "شروع پخش: " + '<span id = "started-mins-ago">' + Math.floor(started_milis_ago / 60000).toString().toFaDigit() + '</span>' + " دقیقه پیش" + "</p>";
        document.getElementById("stream").innerHTML = html;
    } else {
        var html = "<p>" + "در حال حاضر پخش نداریم." + "</p>";
        document.getElementById("stream").innerHTML = html;
    }
});

setInterval(function(){ 
ajax_get(status_url, function(data) {
    if (data["icestats"]["source"]) {
        document.getElementById("listeners").innerHTML = data["icestats"]["source"]["listeners"].toString().toFaDigit();
        var started_milis_ago = Date.now() - Date.parse(data["icestats"]["source"]["stream_start_iso8601"]);
        document.getElementById("started-mins-ago").innerHTML = Math.floor(started_milis_ago / 60000).toString().toFaDigit();
    }
});
}, 30000);
</script>
