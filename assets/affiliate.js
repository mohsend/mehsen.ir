function encode(open) {
    const base = "https://affstat.adro.co/click/169768e2-8920-4a25-a90b-de97baf7dc48/";
    var url = document.getElementById('url').value.trim();
    try {
        var producturl = url.match(/https?:\/\/(www\.)?digikala\.com\/product\/dkp-\d+/)[0];
        document.getElementById('url').value = '';
        var affiliate = base + window.btoa(producturl);
        var parent = document.getElementById('afflinks')
        var node = document.createElement("LI");
        var linknode = document.createElement("A");
        var textnode = document.createTextNode(decodeURI(url));
        linknode.href = affiliate;
        linknode.appendChild(textnode);
        node.appendChild(linknode);
        parent.appendChild(node);
        if (open == '_blank') {
            window.open(affiliate, '_blank');
        }
    } catch {
        alert("به نظر میاد لینک کالای دیجیکالا نیست. -ـ-");
    }
}
