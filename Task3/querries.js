/*
const req = new XMLHttpRequest();
req.onreadystatechange = function() {
    if (req.status == 404) {
        console.log("404");
        return false;
    }

    if (!(req.readyState == 4 && req.status == 200))
        return false;

    const json = (function(raw) {
        try {
            return JSON.parse(raw);
        } catch (err) {
            return false;
        }
    })(req.responseText);

    if (!json)
        return false;

    document.body.innerHTML = "Your city : " + json.city + "<br>Your isp : " + json.org;
};
req.open("GET", "https://ipapi.co/json/", true);
req.send();
 */
