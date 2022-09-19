window.eval = (x) => {
        console.error("Call to eval blocked!");
};

function preventXSS(input)
{
    return input.replace("<", "&lt;").replace(">", "&gt;");
}

function createWS(url)
{
    return new WebSocket("ws://" + url);    
}

function handleWS(ws, onMsg, onOpen, onError)
{
    ws.onopen = onOpen;
    ws.onerror = onError;
    ws.onmessage = onMsg;
    ws.onclose = () => {};
}
        
function sendWS(ws, json)
{
    ws.send(JSON.stringify(json));      // json request
}
