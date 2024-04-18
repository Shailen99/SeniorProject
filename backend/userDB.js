import { serverTimestamp } from "@firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import * as FileSystem from "expo-file-system";

var localUser = null;
const usersCol = FIREBASE_DB.collection("users");

async function registerUser(newData) {
    try {
      await auth.createUserWithEmailAndPassword(newData.email, newData.password);
      return await usersCol.add({
        email: newData.email.toLowerCase(),
      });
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  
function loadLocalUserData(email, onCompletionFunc) 
{
    //Will load data in profile
}

//Save user in DB
function updateLocalUserInDB(newData) {
    for (let field in newData) {
      localUser[field] = newData[field];
    }
    usersCol.doc(localUser.id).update(newData);
  }
  