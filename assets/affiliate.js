function loadlist() {
    listString = window.location.hash.substring(1);
    productIds = listString.split(',');
    productIds.forEach(function(el) {
        var url = "https://www.digikala.com/product/" + el;
        add_to_list(url, url);
      });
}

function make_affiliate(url) {
    const base = "https://affstat.adro.co/click/169768e2-8920-4a25-a90b-de97baf7dc48/";
    var affiliate = base + window.btoa(url);
    return affiliate;
}

function add_to_hash(url) {
    var productid = url.match(/dkp-\d+/);
    if (window.location.hash) {
        window.location.hash += ',' + productid; 
    } else {
        window.location.hash += productid;
    }
}

function add_to_list(url, fullUrl) {
    // add product id to url hash
    var affiliate = make_affiliate(url)
    // add to ul
    var parent = document.getElementById('afflinks');
    var node = document.createElement("LI");
    var linknode = document.createElement("A");
    var textnode = document.createTextNode(decodeURI(fullUrl));
    linknode.href = affiliate;
    linknode.appendChild(textnode);
    node.appendChild(linknode);
    parent.appendChild(node);
    return affiliate;
}

function encode(open) {
    var url = document.getElementById('url').value.trim();
    try {
        var producturl = url.match(/https?:\/\/(www\.)?digikala\.com\/product\/dkp-\d+/)[0];
        document.getElementById('url').value = '';
        affiliate = add_to_list(producturl, url);
        add_to_hash(producturl);
        if (open == '_blank') {
            window.open(affiliate, '_blank');
        }
    } catch {
        alert("به نظر میاد لینک کالای دیجیکالا نیست. -ـ-");
    }
}

if (window.location.hash) {
    loadlist();
}