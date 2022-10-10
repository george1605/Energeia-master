window.eval = (x) => {
    console.error("Call to eval blocked!");
};

function preventXSS(input)
{
    return input.replace("<", "&lt;").replace(">", "&gt;");
}

function addNewsletter(e)
{
    var xhr = new XMLHttpRequest();
    if(e.code == 13)
    {
        xhr.open("POST", "/form", true);
        xhr.onreadystatechange = () => {
            console.log("XHR Newsletter Status: ", xhr.status);
        }
        xhr.send(preventXSS(e.target.value));
    }
}