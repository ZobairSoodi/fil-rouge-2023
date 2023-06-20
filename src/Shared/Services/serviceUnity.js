import * as classes from '../Classes/classes';
import Swal from 'sweetalert2';

export class UnityService {

    unityInstance;
    adress;
    connect;

    constructor(sendMessage, adress, connect) {
        this.sendMessage = sendMessage;
        this.adress = adress;
        this.connect = connect;
    }
    //convert json to instance of eventData class
    static GetTreatmentName(jsonData) {
        const eventdata = new classes.EventData(JSON.parse(jsonData));
        return eventdata;
    }

    HandleEvents(jsonData) {
        const eventdata = UnityService.GetTreatmentName(jsonData);
        switch (eventdata.eventName) {
            case "MarketOperation": {
                //this.HandleMarketOperation(eventdata);
                break;
            }
            case "Order": {
                this.HandleOrder(eventdata);
                break;
            }
            default: {
                alert("event Name not fond");
                break;
            }
        }
    }

    async HandleOrder(eventdata) {
        const parameters = eventdata.parameters;
        switch (parameters.orderName) {
            case "GameReady": {
                /*await this.SendGameData();
                let startEvent = new CustomEvent("enter_ready");
                document.dispatchEvent(startEvent);*/
                break;
            }
            case "GameStarted": {
                /* this.gameStarted = true;
                 this.spinnerService.requestEnded();*/
                break;
            }
            case "Authentificate": {
                console.log("Authentificate")
                await this.AuthenticationData();
                break;
            }
            case "SaveRoom": {
                //this.SaveRoomData(parameters.parameters[0]);
                break;
            }
            case "LockPointer": {
                //this.LockPointer();
                break;
            }
            case "VideoUrl": {
                //this.OpenModalVideoLink();
                break;
            }
            case "Poap": {
                //await this.GetPoap();
                break;
            }
            case "MarketItems": {
                /**/
                break;
            }
            default: {
                console.log("order Name not fond");
                break;
            }
        }
    }


    async SendGameWalletData(userAddress) {
        console.log("Authentificate userAddress" + this.adress)

        // do something
        let walletData = new classes.WalletData(
            userAddress,
            [],
            [],
            [],
            [],
            []
        );
        let eventdata = new classes.EventData("WalletData", walletData);
        this.SendData(eventdata);
    }

    async SendData(eventData) {
        eventData.parameters = JSON.stringify(eventData.parameters);
        const dataToSend = JSON.stringify(eventData);
        //send the walletData
        console.log("data to send " + dataToSend);
        this.sendMessage("ReactConnector", "CallConnectorEvent", dataToSend);
    }

    //Authentificate
    async AuthenticationData() {
        
        console.log("Authentificate address" + this.adress)

        if (!this.adress) {
            console.log("Authentificate address" + this.adress);
            const choice = await Swal.fire({
                title: 'You\'re not connected!',
                confirmButtonText: 'Connect Wallet',
                showCancelButton: true,
                cancelButtonText: 'Play as a guest',
            });
            console.log(choice);

            if (choice.isConfirmed) {
                Swal.fire({
                    text: 'Waiting!',
                    confirmButtonText: false
                });
                Swal.showLoading()
                const conn = await this.connect();
                
                if(!conn.error){
                    Swal.clickCancel();
                    this.adress = conn.data.account;
                    this.SendGameWalletData(conn.data.account);
                }
                else{
                    Swal.clickCancel();
                    this.AuthenticationData();
                }
            }
            else if (choice.isDismissed && choice.dismiss === 'cancel') {
                this.SendGameWalletData("");
            }
        }
        else {
            this.SendGameWalletData(this.adress);
        }
    }


}