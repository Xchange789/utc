(function (){
    // receive event
    window.TelegramGameProxy.receiveEvent =
    window.Telegram.WebView.receiveEvent  =
    window.TelegramGameProxy_receiveEvent =
        (eventType, eventData) => {
            console.log(eventType);
            console.log(eventData);
        };
})();
