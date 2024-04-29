import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Button } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import tw from "twrnc";
import { Picker } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { getFirestore, addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { getDoc, getDocs, setDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';



function HomeScreen() {
    const [selectedYear, setSelectedYear] = useState('0');
    const [selectedMajor, setSelectedMajor] = useState('0');
    const [selectedStyle, setSelectedStyle] = useState('0');
    const [selectedLocation, setSelectedLocation] = useState('0');
    const [selectedArea, setSelectedArea] = useState('0');
    const [selectedShort, setSelectedShort] = useState('0');
    const [selectedLong, setSelectedLong] = useState('0');

    const yearOptions = [
        { label: '1st Year', value: '1' },
        { label: '2nd Year', value: '2' },
        { label: '3rd Year', value: '3' },
        { label: '4th Year', value: '4' },
        { label: 'Graduate', value: 'graduate' },
    ];
    const majorOptions = [
        { label: 'Biology', value: 'biology' },
        { label: 'Computer Science', value: 'computer_science' },
        { label: 'Economics', value: 'economics' },
        { label: 'Mechanical Engineering', value: 'mechanical_engineering' },
        { label: 'Psychology', value: 'psychology' },
        { label: 'English Literature', value: 'english_literature' },
        { label: 'Chemistry', value: 'chemistry' },
        { label: 'Political Science', value: 'political_science' },
        { label: 'Business Administration', value: 'business_administration' },
        { label: 'Fine Arts', value: 'fine_arts' },
        { label: 'Physics', value: 'physics' },
        { label: 'History', value: 'history' },
        { label: 'Philosophy', value: 'philosophy' },
        { label: 'Sociology', value: 'sociology' },
        { label: 'Mathematics', value: 'mathematics' },
        { label: 'Environmental Science', value: 'environmental_science' },
        { label: 'Education', value: 'education' },
        { label: 'Nursing', value: 'nursing' },
        { label: 'Architecture', value: 'architecture' },
        { label: 'Music', value: 'music' }
    ];
    const styleOptions = [{ label: 'Visual', value: 'visual' },
    { label: 'Auditory', value: 'auditory' },
    { label: 'ReadWrite', value: 'readWrite' },
    { label: 'Kinesthetic', value: 'kinesthetic' }
    ];
    const locationOptions = [{ label: 'Library', value: 'Library' },
    { label: 'Cafe', value: 'Cafe' },
    { label: 'Class', value: 'Class' },
    { label: 'Outdoors', value: 'Outdoors' }
    ];
    const areaOptions = [{ label: 'TimeManage', value: 'TimeManage' },
    { label: 'Notetake', value: 'Notetake' },
    { label: 'CritThink', value: 'CritThink' },
    { label: 'ProbSolv', value: 'ProbSolv' },
    { label: 'CommSkills', value: 'CommSkills' }
    ];
    const shortTermGoalsOptions = [{ label: 'Improve grades', value: 'GradeImprove' },
    { label: 'Learn new study techniques', value: 'LearnTechs' },
    { label: 'Complete assignments on time', value: 'OnTimeAssign' },
    { label: 'Prepare for exams', value: 'Prepare for exams' }
    ];
    const longTermGoalsOptions = [{ label: 'Graduate with honors', value: 'GradHonors' },
    {
        label: 'Get into a prestigious program', value: 'PrestigeProgram'
    },
    {
        label: 'Build a strong academic foundation', value: 'StrongFoundation'
    },
    {
        label: 'Develop research skills', value: 'ResearchSkills'
    }
    ];

    const [previewUrl, setPreviewUrl] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentMajor, setMajor] = useState('');
    const [currentYear, setCurrentYear] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const auth = getAuth();


    useEffect(() => {
        async function fetchUserData() {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const db = getFirestore();
                const userDocRef = doc(db, 'users', userId);

                try {
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        // Fill form fields with user data
                        setPreviewUrl(userData.photoUrl || null);
                        setUserEmail(user.email || null);
                        setFirstName(userData.firstName || '');
                        setLastName(userData.lastName || '');
                        setMajor(userData.major || '');
                        setCurrentYear(userData.year || '');
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                }
            } else {
                console.log("User is not logged in.");
            }
        }
        fetchUserData();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [matchedUsers, setMatchedUsers] = useState([]);


    // 获取Firestore实例
    const firebaseConfig = {
        apiKey: "AIzaSyBC3sPlDvRig70ZTRfDeIWS_HTFqE76AsU",
        authDomain: "studypartners-fd29f.firebaseapp.com",
        projectId: "studypartners-fd29f",
        storageBucket: "studypartners-fd29f.appspot.com",
        messagingSenderId: "96427750273",
        appId: "1:96427750273:web:6700ea57b38ec4ee396e80",
        measurementId: "G-96K4LVQS0Z"
    };

    const firebaseApp = initializeApp(firebaseConfig);


    const db = getFirestore(firebaseApp);
    const currentUser = auth.currentUser;
    const selfID = self.uid;

    // 修改handleSearch函数
    const handleSearch = async () => {
        const filterData = {
            year: selectedYear,
            major: selectedMajor,
            studyStyles: selectedStyle,
            locationPrefs: selectedLocation,
            areasToImprove: selectedArea,
            shortTermGoals: selectedShort,
            longTermGoals: selectedLong,
        };
        console.log(filterData);
        try {
            // 从Firestore中获取用户数据
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const usersData = usersSnapshot.docs.map(doc => doc.data());
            console.log(usersData);
            // 过滤匹配的用户
            const filteredUsers = usersData.filter(user => {
                // 过滤条件
                const yearMatch = filterData.year === '0' || user.year === filterData.year;
                const majorMatch = filterData.major === '0' || user.major === filterData.major;
                const studyStylesMatch = filterData.studyStyles === '0' || user.studyStyles && user.studyStyles[filterData.studyStyles];
                const locationPrefsMatch = filterData.locationPrefs === '0' || user.locationPrefs && user.locationPrefs[filterData.locationPrefs];
                const areasToImproveMatch = filterData.areasToImprove === '0' || user.areasToImprove && user.areasToImprove[filterData.areasToImprove];
                const shortTermGoalMatch = filterData.shortTermGoals === '0' || user.shortTermGoals && user.shortTermGoals[filterData.shortTermGoals];
                const longTermGoalMatch = filterData.longTermGoals === '0' || user.longTermGoals && user.longTermGoals[filterData.longTermGoals];
                // 返回是否所有条件都匹配
                return yearMatch && majorMatch && studyStylesMatch && locationPrefsMatch && areasToImproveMatch && shortTermGoalMatch && longTermGoalMatch;
            }).slice(0, 3); // 限制结果为前3个匹配项


            console.log('Matching users:', filteredUsers);
            setMatchedUsers(filteredUsers);
            setShowModal(true); // Show the modal with results
        } catch (error) {
            console.error('Error fetching users:', error);
            // 处理错误
        }
    };


    // 检查 friends 集合是否存在，如果不存在则创建
    const checkAndCreateFriendsCollection = async () => {
        try {
            const friendsCollectionRef = collection(db, 'friends');
            const friendsSnapshot = await getDocs(friendsCollectionRef);
            if (friendsSnapshot.empty) {
                // 如果集合不存在，创建集合
                await addDoc(friendsCollectionRef, { placeholder: 'data' });
                console.log('成功创建 friends 集合');
            } else {
                console.log('friends 集合已存在');
            }
        } catch (error) {
            console.error('检查和创建 friends 集合时出错:', error);
        }
    };

    // 调用函数来检查和创建 friends 集合
    checkAndCreateFriendsCollection();

    const handleAddFriend = async (friend) => {
        try {
            const auth = getAuth();
            if (!auth.currentUser) {
                console.error('未检测到登录用户');
                return;
            }
            const currentUserUID = auth.currentUser.uid;
            if (!friend.uid) {
                console.error('无效的好友信息');
                return;
            }

            // 现在 currentUserUID 和 friend.uid 都已验证不为空
            const currentUserRef = doc(db, 'friends', currentUserUID);
            const currentUserDoc = await getDoc(currentUserRef);
            if (currentUserDoc.exists()) {
                const currentUserData = currentUserDoc.data();
                const currentUserFriends = currentUserData.friends || [];
                if (currentUserFriends.includes(friend.uid)) {
                    alert('User is already your friend');
                    return;
                }
                const updatedCurrentUserFriends = [...currentUserFriends, friend.uid].filter(value => value !== undefined);
                await setDoc(currentUserRef, { friends: updatedCurrentUserFriends });
            } else {
                await setDoc(currentUserRef, { friends: [friend.uid] });
            }

            const friendRef = doc(db, 'friends', friend.uid);
            const friendDoc = await getDoc(friendRef);
            if (friendDoc.exists()) {
                const friendData = friendDoc.data();
                const friendFriends = friendData.friends || [];
                const updatedFriendFriends = [...friendFriends, currentUserUID].filter(value => value !== undefined);
                await setDoc(friendRef, { friends: updatedFriendFriends });
            } else {
                await setDoc(friendRef, { friends: [currentUserUID] });
            }

            alert('Successfully add friend:', friend.firstName, friend.lastName);
        } catch (error) {
            alert('Add failed:', error);
        }
    };

    const [friends, setFriends] = useState([]);
    const currentUserUID = auth.currentUser.uid;
    useEffect(() => {
        async function fetchFriends() {
            const docRef = doc(db, "friends", currentUserUID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const friendsUIDs = docSnap.data().friends;
                const friendsDetails = await Promise.all(friendsUIDs.map(async uid => {
                    const userDocRef = doc(db, "users", uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        return `${userData.lastName}, ${userData.firstName} - ${userData.major}`;
                    }
                    return null;
                }));
                setFriends(friendsDetails.filter(friend => friend !== null));
            }
        }

        fetchFriends();
    }, [currentUserUID]);

    async function getFriendsList(uid) {
        const docRef = doc(db, "friends", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const friendsUIDs = docSnap.data().friends;
            const friendsDetails = await Promise.all(friendsUIDs.map(getFriendDetails));
            return friendsDetails.filter(friend => friend !== null); // 过滤掉找不到的用户
        } else {
            console.log("No friends document found.");
            return [];
        }
    }



    return (
        <SafeAreaView style={styles.flexContainer}>
            <View style={styles.container}>
                <View style={styles.profileSection}>
                    {previewUrl && (
                        <img src={previewUrl} alt="Preview" style={styles.profilePicture} />)}
                    <Text style={styles.profileContent}>Email: {userEmail}</Text>
                    <Text style={styles.profileContent}>First Name: {firstName}</Text>
                    <Text style={styles.profileContent}>Last Name: {lastName}</Text>
                    <Text style={styles.profileContent}>Major: {currentMajor}</Text>
                    <Text style={styles.profileContent}>Year: {currentYear}</Text>
                </View>
                <View style={styles.rightSideSection}>
                    <View style={styles.connectionsSection}>
                        <ScrollView>
                            <div>
                                <h1>My Friends</h1>
                                <ul>
                                    {friends.map((friend, index) => (
                                        <li key={index}>{friend}</li>
                                    ))}
                                </ul>
                            </div>

                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.searchButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                            <ScrollView>
                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Year:</Text>
                                    <Picker
                                        selectedValue={selectedYear}
                                        onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
                                    >
                                        <Picker.Item label="--Select year--" value={'0'} />
                                        {yearOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>
                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Major:</Text>
                                    <Picker
                                        selectedValue={selectedMajor}
                                        onValueChange={(itemValue, itemIndex) => setSelectedMajor(itemValue)}
                                    >
                                        <Picker.Item label="--Select major--" value={'0'} />
                                        {majorOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Study Style:</Text>
                                    <Picker
                                        selectedValue={selectedStyle}
                                        onValueChange={(itemValue, itemIndex) => setSelectedStyle(itemValue)}
                                    >
                                        <Picker.Item label="--Select study styles--" value={'0'} />
                                        {styleOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Location Preferences:</Text>
                                    <Picker
                                        selectedValue={selectedLocation}
                                        onValueChange={(itemValue, itemIndex) => setSelectedLocation(itemValue)}
                                    >
                                        <Picker.Item label="--Select prefer location--" value={'0'} />
                                        {locationOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Areas to Improve:</Text>
                                    <Picker
                                        selectedValue={selectedArea}
                                        onValueChange={(itemValue, itemIndex) => setSelectedArea(itemValue)}
                                    >
                                        <Picker.Item label="--Select areas to improve--" value={'0'} />
                                        {areaOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Short-Term Goal:</Text>
                                    <Picker
                                        selectedValue={selectedShort}
                                        onValueChange={(itemValue, itemIndex) => setSelectedShort(itemValue)}
                                    >
                                        <Picker.Item label="--Select short term goal--" value={'0'} />
                                        {shortTermGoalsOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>

                                <View style={styles.filterDropdown}>
                                    <Text style={styles.filterTitle}>Long-Term Goal:</Text>
                                    <Picker
                                        selectedValue={selectedLong}
                                        onValueChange={(itemValue, itemIndex) => setSelectedLong(itemValue)}
                                    >
                                        <Picker.Item label="--Select longterm goal--" value={'0'} />
                                        {longTermGoalsOptions.map((option) => (
                                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </Picker>
                                </View>
                            </ScrollView>
                            <Button title="Search" onPress={() => { handleSearch(); setModalVisible(false); }} />
                        </View>


                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(false);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.row}>
                                    {matchedUsers.map((user, index) => (
                                        <View key={index} style={styles.userBox}>
                                            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                                            <Text style={styles.userInfo}>Year: {user.year}</Text>
                                            <Text style={styles.userInfo}>Major: {user.major}</Text>
                                            {/* Add a button to add friend */}
                                            <Button
                                                title="Add Friend"
                                                onPress={() => handleAddFriend(user)}
                                                style={styles.addButton}
                                            />
                                        </View>

                                    ))}
                                </View>
                                <Button
                                    title="Close"
                                    onPress={() => setShowModal(false)}
                                />
                            </View>
                        </View>
                    </Modal>

                </View>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        width: '90%',
        maxHeight: '80%',
    },
    userBox: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: 'F2F2F2',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 100,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userInfo: {
        fontSize: 14,
        marginBottom: 3,
    },
    modalText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5,
    },
    addButton: {
        marginTop: 10, // Adjust the margin top as needed
    },    
    row: {
        flexDirection: 'row',
        width: '100%',
    },
    pickerStyle: {
        width: '100%',
        marginBottom: 20,
    },
    flexContainer: {
        flex: 1,
        backgroundColor: '#ffffff', // Set background color to white
    },
    container: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 20, // Add paddingTop to shift content up
    },
    profileSection: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profilePicture: {
        width: 250, // Increase width of profile picture
        height: 250, // Increase height of profile picture
        borderRadius: 125, // Adjust border radius to make it circular
        marginBottom: 20,
    },
    profileContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    rightSideSection: {
        flex: 1,
        padding: 20,
    },
    connectionsSection: {
        backgroundColor: '#EFF3FF',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    friendsList: {
        marginBottom: 10,
    },
    friendItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    searchButton: {
        backgroundColor: '#81dff6',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    searchButtonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    modalView: {
        marginTop: 50,
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#333',
    },
    filterCheckbox: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    filterText: {
        fontSize: 16,
        marginLeft: 8,
    },
});
