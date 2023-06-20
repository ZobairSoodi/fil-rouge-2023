import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, query, where, getDoc, getDocs, collection, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";

export class FirebaseService {
    firebaseConfig = {
        apiKey: process.env.REACT_APP_MY_API_KEY,
        authDomain: process.env.REACT_APP_MY_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_MY_PROJECT_ID,
        storageBucket: process.env.REACT_APP_MY_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MY_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_MY_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };

    app = initializeApp(this.firebaseConfig);
    db = getFirestore(this.app);

    // get game
    async getGame(name) {
        const docRef = doc(this.db, "games", name);
        const game = (await getDoc(docRef)).data();
        console.log(game);
        return game;
    }

    // get games
    async getGames() {
        const data = await getDocs(collection(this.db, "games"));
        let games = [];
        data.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            games.push({ ...doc.data(), "id": doc.id });
        });
        return games;
    }

    // get games
    async getGamesExcept(name) {
        const q = query(collection(this.db, "games"), where("folder", "!=", name));
        const data = await getDocs(q);
        let games = [];
        data.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            games.push(doc.data());
        });
        return games;
    }

    // get leaderboard of a specific game

    async getGameLeaderboard(name, setLeader) {
        const q = query(collection(this.db, "games/" + name + "/Leaderboard"));
        onSnapshot(q, (querySnapshot) => {
            let leaderboard = [];
            querySnapshot.forEach((doc) => {
                leaderboard.push(doc.data());
            });
            leaderboard.sort((a, b) => (a.highscore < b.highscore) ? 1 : -1);
            console.log("leaaaaaaaader ", leaderboard);
            if (setLeader) {
                setLeader(leaderboard);
            }
            return;
        });
    }

    async checkLeaderboard(game, walletAddress, ticketId) {
        // console.log("games/" + game + "/Leaderboard/" + walletAddress + "-" + ticketId);
        const docRef = doc(this.db, "games/" + game + "/Leaderboard", walletAddress + "-" + ticketId);
        const data = (await getDoc(docRef)).data();
        if (data) {
            return data
        }

        return false;
    }

    async initScore(game, walletAddress, ticketId) {
        setDoc(doc(this.db, "games/" + game + "/Leaderboard", walletAddress + "-" + ticketId), {
            "fullname": "user",
            "highscore": 0,
            "ticketId": ticketId,
            "walletAddress": walletAddress,
            "state": "allowed"
        });
    }

    async changeScorePerm(game, walletAddress, ticketId, permission) {
        const docRef = doc(this.db, "games/" + game + "/Leaderboard", walletAddress + "-" + ticketId);
        const data = updateDoc(docRef, {
            "state": permission
        });
        return data;
    }

    // add firebase doc
    addUser(walleteAdress, username, email) {
        setDoc(doc(this.db, "users", walleteAdress), {
            name: username,
            email: email,
        });
    }

    // Submit score
    async submitScore(score, username, isAllowed) {
        const docRef = doc(this.db, "users", username);
        (await getDoc(docRef)).data();
    }

    async storeGame(gameData) {
        try {
            // Convert the image file to a base64-encoded string
            const imageFile = gameData.image;
            const imageBase64 = await this.convertFileToBase64(imageFile);
            // Storing the game data in a new document in the "games" collection
            await setDoc(doc(this.db, "games", gameData.title), {
                current_contract_address: null,
                current_ticket_id: null,
                description: gameData.description,
                file: gameData.title,
                image: imageBase64,
                title: gameData.title,
            });
            console.log("The game data has been stored successfully in Firebase.");
        } catch (error) {
            console.error("Error storing the game data in Firebase:", error);
        }
    }
    // Helper function to convert a File object to a base64-encoded string
    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    // delete game admin

    deleteGame(title) {
        const docRef = doc(this.db, "games", title);
        deleteDoc(docRef)
            .then(() => {
                console.log("Entire Document has been deleted successfully.");
            })
            .catch(error => {
                console.log(error);
            })
    }

    updateGame(id, data) {
        const docRef = doc(this.db, "games", id);
        updateDoc(docRef, data)
            .then(() => {
                console.log("updated");
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            })
    }
}