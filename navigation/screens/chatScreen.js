import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore';
import { Alert, SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Button,TextInput } from "react-native";

const firebaseConfig = {
    apiKey: "你的API_KEY",
    authDomain: "你的AUTH_DOMAIN",
    projectId: "你的PROJECT_ID",
    storageBucket: "你的STORAGE_BUCKET",
    messagingSenderId: "你的MESSAGING_SENDER_ID",
    appId: "你的APP_ID",
    measurementId: "你的MEASUREMENT_ID"
};

// 确保 Firebase 只初始化一次
let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApps()[0]; // 如果已经初始化，使用已有的实例
}

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function ChatApp() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentChatRoom, setCurrentChatRoom] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // 设置用户状态
            } else {
                setUser(null); // 清除用户状态
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user && currentChatRoom) {
            const messagesRef = collection(firestore, `chatRooms/${currentChatRoom}/messages`);
            const q = query(messagesRef, orderBy('timestamp'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const messagesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(messagesData);
            });
            return () => unsubscribe();
        }
    }, [user, currentChatRoom]);

    const handleChatRoomSelect = chatRoomId => {
        setCurrentChatRoom(chatRoomId);
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();

        const userDocRef = doc(firestore, `users/${user.uid}`);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            console.error("No such user!");
            return; // 如果用户信息不存在，则终止操作
        }

        const userInfo = userDocSnap.data(); // 获取用户文档中的数据

        if (!newMessage.trim() || !currentChatRoom) return;

        const messagesRef = collection(firestore, `chatRooms/${currentChatRoom}/messages`);
        try {
            await addDoc(messagesRef, {
                sender: user.uid,
                name: userInfo.lastName,
                text: newMessage.trim(),
                timestamp: Date.now()
            });
            setNewMessage('');
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.displayName}</h1>
                    <div>
                        <h2>Chat Rooms</h2>
                        <div>
                            <button onClick={() => handleChatRoomSelect("chatRoom1")}>
                                Chat Room 1
                            </button>
                            <button onClick={() => handleChatRoomSelect("chatRoom2")}>
                                Chat Room 2
                            </button>
                            <button onClick={() => handleChatRoomSelect("chatRoom3")}>
                                Chat Room 3
                            </button>
                        </div>
                    </div>
                    <div style={{ padding: 10 }}>
                        <h2>Chat Room: {currentChatRoom}</h2>
                        <div style={{ height: 400, overflowY: 'auto', marginBottom: 10 }}>
                            {messages.map((message) => (
                                <div key={message.id}>
                                    <strong>{message.name}:</strong>
                                    <span> {message.text}</span>
                                    <div>{new Date(message.timestamp).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message here..."
                            style={{ padding: 10, marginBottom: 10, width: '100%', boxSizing: 'border-box' }}
                        />
                        <button onClick={handleMessageSubmit}>Send</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Chat App</h1>
                    <p>User authentication is required to access this application.</p>
                </div>
            )}
        </div>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'  // 确保ScrollView和输入框之间有空间分布
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    chatContainer: {
        flex: 1,  // 给予足够的空间可以滚动
        marginBottom: 10
    },
    messageBox: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    messageName: {
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        minHeight: 50, // 设置一个最小高度保证输入框易于点击
        fontSize: 16 // 增大字体使输入更容易
    }
});

export default ChatApp;

