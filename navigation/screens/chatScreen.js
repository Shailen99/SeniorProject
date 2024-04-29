import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore';
import { Alert, SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Button,TextInput } from "react-native";

const firebaseConfig = {
    apiKey: "���API_KEY",
    authDomain: "���AUTH_DOMAIN",
    projectId: "���PROJECT_ID",
    storageBucket: "���STORAGE_BUCKET",
    messagingSenderId: "���MESSAGING_SENDER_ID",
    appId: "���APP_ID",
    measurementId: "���MEASUREMENT_ID"
};

// ȷ�� Firebase ֻ��ʼ��һ��
let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApps()[0]; // ����Ѿ���ʼ����ʹ�����е�ʵ��
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
                setUser(user); // �����û�״̬
            } else {
                setUser(null); // ����û�״̬
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
            return; // ����û���Ϣ�����ڣ�����ֹ����
        }

        const userInfo = userDocSnap.data(); // ��ȡ�û��ĵ��е�����

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
        justifyContent: 'space-between'  // ȷ��ScrollView�������֮���пռ�ֲ�
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    chatContainer: {
        flex: 1,  // �����㹻�Ŀռ���Թ���
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
        minHeight: 50, // ����һ����С�߶ȱ�֤��������ڵ��
        fontSize: 16 // ��������ʹ���������
    }
});

export default ChatApp;

