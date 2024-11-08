(function (){
    // receive event
    window.TelegramGameProxy.receiveEvent =
        window.Telegram.WebView.receiveEvent  =
            window.TelegramGameProxy_receiveEvent =
                (eventType, eventData) => void {
                    unityInstanceRef.SendMessage("TelegramSDKManger", "TelegramCallBack", JSON.stringify(backData));
                };
})
