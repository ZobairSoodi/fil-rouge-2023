export class NftData {
    nft;
    isListed;
    price = '0';

    constructor(data) {
        this.nft = data.nft;
        this.isListed = data.isListed;
        this.price = data.price
    }
}