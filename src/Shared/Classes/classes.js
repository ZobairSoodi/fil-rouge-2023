export class Werabeals {

    constructor(token, contract, item) {
        this.itemId = item;
        this.contractAddress = contract;
        this.tokenId = token
    }
}

export class NftData {

    price = '0';
    constructor(data) {
        this.nft = data.nft;
        this.isListed = data.isListed;
        this.price = data.price
    }
}

export class EventData {

    constructor2(name, parameters) {
        this.eventName = name
        this.parameters = parameters
    };
    constructor1(data) {
        this.eventName = data.eventName
        if (data.eventName === "Order") {
            this.parameters = new OrderData(JSON.parse(data.parameters))
        } else {
            this.parameters = new MarketOperationData(JSON.parse(data.parameters))
        }
    };
    constructor(...attributes) {
        if (attributes.length === 1) {
            this.constructor1(attributes[0])
            return;
        }
        if (attributes.length === 2) {
            this.constructor2(attributes[0], attributes[1])
            return;
        }
    }
}

export class AvatarData {

    constructor(name, type, url) {
        this.avatarName = name;
        this.avatarType = type;
        this.avatarUrl = url;
    }
}

export class GameData {

    constructor(mode, scene, room) {
        this.mode = mode;
        this.sceneName = scene;
        this.template = scene;
        this.roomName = room.roomName;
        this.roomOwner = room.OwnerAddress;
        this.roomData = room.jsonDa;
    }
}

export class WalletData {

    constructor(address, Wearables, emotes, arts, artsVideo, arts3D) {
        this.walletAddress = address
        this.Wearables = Wearables
        this.arts = arts
        this.artsVideo = artsVideo
        this.arts3D = arts3D
        this.emotes = emotes
    }
}

export class OperationResult {
    
    constructor(prob, succeed) {
        this.iSucceed = succeed
        this.problem = prob
    }
}

export class MarketOperationData {

    constructor2(name, data, result) {
        this.nameOfOperation = name
        this.dataOfNft = data
        this.result = result
    };
    constructor1(data) {
        Object.assign(this, data)
    };

    constructor(...attributes) {
        if (attributes.length === 1) {
            this.constructor1(attributes[0])
            return;
        }
        if (attributes.length === 3) {
            this.constructor2(attributes[0], attributes[1], attributes[2])
            return;
        }
    }
}

export class OrderData {
    
    constructor2(name, parameters) {
        this.orderName = name
        this.parameters = parameters
    };
    constructor1(data) {
        Object.assign(this, data)
    };
    constructor(...attributes) {
        if (attributes.length === 1) {
            this.constructor1(attributes[0])
            return;
        }
        if (attributes.length === 2) {
            this.constructor2(attributes[0], attributes[1])
            return;
        }
    }

}

export class MintMetaData {
    constructor(tokenId) {
        this.description = "Dynamic NFT version " + tokenId;
        this.animation_url = "https://dinoapi.dinomite.click/character/"+ tokenId;
        this.image = "https://ipfs.thirdwebcdn.com/ipfs/QmVPvKZqQLkhhaNoyZUN6m9oGMQBLBYyCYD1xH5QuEWfvJ/lizard.gif";
        this.name = "Dynamic NFT " + tokenId;

        this.attributes = [
            {"trait_type": "Eyes","value": "Big"},
            {"trait_type": "Stamina","value": 1.5},
            {"trait_type": "Personality","value": "Happy"},
        ];

        this.properties = [];
    }
}

export class Metadata {

    constructor(metadata) {
        this.description = metadata.description;
        this.animation_url = metadata.animation_url;
        this.image = metadata.image;
        this.name = metadata.name;
        this.attributes = metadata.attributes;
        this.properties = metadata.properties;
    }
}
export class Attribute {

    constructor(trait_type, value, display_type) {
        this.trait_type = trait_type;
        this.value = value;
        this.display_type = display_type;
    }
}
export class Properties {

    constructor(base, rich_property) {
        this.base = base;
        this.rich_property = rich_property;
    }
}
export class RichProperty {

    constructor(name, value, display_value) {
        this.name = name;
        this.value = value;
        this.display_value = display_value;
    }
}