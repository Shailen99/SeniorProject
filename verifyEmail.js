import * as SecureStore from 'expo-secure-store';
import { verifyBeforeUpdateEmail } from 'firebase/auth';
import { query, collection, where, getDocs } from "firebase/firestore";

async function saveUserEmail(email) {
    await SecureStore.setItemAsync('userEmail', email);
}

async function getUserEmail() {
    return await SecureStore.getItemAsync('userEmail');
}

async function checkEmailExists(email) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            console.log("Email already exists in the database.");
            return true; // Email exists
        } else {
            console.log("Email does not exist in the database.");
            return false; // Email does not exist
        }
    } catch (error) {
        console.error("Error querying for email:", error);
        throw error;
    }
}

async function retrieveEmail() {
    try {
        const userEmail = await SecureStore.getItemAsync('userEmail');
        if (userEmail) {
            return userEmail;
        } else {
            console.log("No email found in Secure Storage.");
        }
    } catch (error) {
        console.error("Failed to retrieve email:", error);
    }
}


export {saveUserEmail}