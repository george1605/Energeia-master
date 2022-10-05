window.eval = (x) => {
        console.error("Call to eval blocked!");
};

function preventXSS(input)
{
    return input.replace("<", "&lt;").replace(">", "&gt;");
}

function addNewsletter()
{

document.querySelector("#newsletter").addEventListener('keypress', (e) => {
    if(e.code == 13)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/form", true);
        xhr.onreadystatechange = () => {
            console.log("XHR Newsletter Status: ", xhr.status);
        }
        xhr.send(preventXSS(e.target.value));
    }
})

}