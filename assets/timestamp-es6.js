const dateStringOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }

timeElemList = document.getElementsByTagName("time")

for (let el of timeElemList) {
    timestamp = el.getAttribute("timestamp")
    datetime = new Date(timestamp);
    persianDateString = datetime.toLocaleDateString('fa-IR', dateStringOptions)
    el.textContent = persianDateString
}