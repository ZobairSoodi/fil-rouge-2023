export class Wearable {
    itemId;
    contractAddress;
    tokenId;

    constructor(token, contract, item) {
        this.itemId = item;
        this.contractAddress = contract;
        this.tokenId = token
    }
}