import axios from "axios";
import { NftData } from '../Shared/Classes/NftData';
import { Wearable } from "../Shared/Classes/Wearables";

export class GetDataService {
    async getWearables(userAdress) {
        let data = [];
        let dataCount = 0;
        let firstAmount = 10;
        const params = {
            'first': firstAmount,
            'sortBy': "newest",
            'category': "wearable",
            'owner': userAdress,
            'skip': 0,
        };

        do {
            // retrieve wearables of the current user
            const response = await axios.get("https://nft-api.decentraland.org/v1/nfts",
                { 'params': params }
            );

            dataCount = response.data.data.length;
            params.skip += firstAmount;

            const wearables_filtered = response.data.data.map((item) => {
                return new NftData({
                    nft: new Wearable(item.nft.tokenId, item.nft.contractAddress, item.nft.itemId),
                    isListed: false,
                    price: "0"
                });
            });
            data.push(...wearables_filtered);
        }
        while (dataCount >= firstAmount);
        return data;
    }

    async getAvatarImage(userAdress) {
        const params = {
            'id': userAdress
        };

        const response = await axios.get('https://peer.decentraland.org/lambdas/profiles',
            { 'params': params }
        )

        return response.data[0].avatars[0].avatar.snapshots.face256;
    }
}