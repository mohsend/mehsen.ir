var products = [];
var affiliate_links = true;

var affiliate_checkbox = document.getElementById("affiliate_checkbox");
affiliate_checkbox.addEventListener('change', function() {
    affiliate_links = this.checked;
    make_html_list();
});

function load_list() {
    listString = window.location.hash.substring(1);
    productIds = listString.split(',');
    productIds.forEach(function (el) {
        products.push(make_product_from_id(el));
    });
}

function make_affiliate(url) {
    const base_digikala  = "https://affstat.adro.co/click/169768e2-8920-4a25-a90b-de97baf7dc48/";
    const base_digistyle = "https://affstat.adro.co/click/8d83a449-9094-4829-9823-d36b427cd4d0/";
    return base_digikala + window.btoa(url);
}

function make_product_from_id(id) {
    var product = {
        digikala_id: id
    };
    product.url = "https://www.digikala.com/product/" + product.digikala_id;
    product.affiliate_url = make_affiliate(product.url);
    return product;
}

function update_window_hash() {
    var ids = products.map(product => product.digikala_id);
    window.location.hash = ids.join(',');
}

function add_to_products_from_url(url) {
    const digikala_id = url.match(/dkp-\d+/)[0];
    var product = make_product_from_id(digikala_id);
    product.full_url = url;
    products.push(product);
    return product;
}

function make_html_list() {
    // add to ul
    const parent = document.getElementById('afflinks');
    parent.innerHTML = "";
    products.forEach(function (product) {
        var node = document.createElement("LI");
        var linknode = document.createElement("A");
        if (product.full_url) {
            var textnode = document.createTextNode(decodeURI(product.full_url));
        } else {
            var textnode = document.createTextNode(decodeURI(product.url));
        }
        linknode.href = affiliate_links ? product.affiliate_url : product.url;
        linknode.setAttribute("target", "_blank");
        linknode.appendChild(textnode);
        node.appendChild(linknode);
        parent.appendChild(node);
    });
}

function encode(event) {
    event.preventDefault();
    const url_input = document.getElementById('url');
    var url = url_input.value.trim();
    url_input.value = '';
    try {
        var product = add_to_products_from_url(url);
        make_html_list();
        update_window_hash();
    } catch {
        alert("به نظر میاد لینک کالای دیجیکالا نیست. -ـ-");
    }
}

if (window.location.hash) {
    load_list();
    make_html_list();
}
