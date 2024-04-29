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
        <SafeAreaView style={styles.container}>
            {user ? (
                <View style={styles.chatContainer}>
                    <View style={styles.chatRooms}>
                        <Text style={styles.header}>Chat Rooms</Text>
                        <ScrollView>
                            <TouchableOpacity style={styles.button} onPress={() => handleChatRoomSelect("chatRoom1")}>
                                <Text>Chat Room 1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleChatRoomSelect("chatRoom2")}>
                                <Text>Chat Room 2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleChatRoomSelect("chatRoom3")}>
                                <Text>Chat Room 3</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.chatMessages}>
                        <ScrollView>
                            {messages.map((message) => (
                                <View key={message.id} style={message.sender === user.uid ? styles.myMessage : styles.otherMessage}>
                                    <View style={styles.messageContent}>
                                        <Text style={styles.messageSender}>{message.name}</Text>
                                        <Text>{message.text}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Type your message"
                                value={newMessage}
                                onChangeText={setNewMessage}
                            />
                            <Button title="Send" onPress={handleMessageSubmit} />
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.center}>
                    <Text style={styles.header}>Chat App</Text>
                    <Text>User authentication is required to access this application.</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chatRooms: {
        width: '30%',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    chatMessages: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    myMessage: {
        alignSelf: 'flex-end',
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#DCF8C6',
        borderRadius: 10,
        maxWidth: '70%',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#E5E5EA',
        borderRadius: 10,
        maxWidth: '70%',
    },
    messageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageSender: {
        marginRight: 5,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
    },
});

export default ChatApp;
