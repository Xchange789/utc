(function (window){
    // receive event
    window.TelegramGameProxy.receiveEvent =
        (eventType, eventData) => {
            console.log(eventType);
            console.log(eventData);
        };
    window.Telegram.WebView.receiveEvent  =
        (eventType, eventData) => {
            console.log(eventType);
            console.log(eventData);
        };
    window.TelegramGameProxy_receiveEvent =
        (eventType, eventData) => {
            console.log(eventType);
            console.log(eventData);
        };
})
