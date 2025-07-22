
# How to Build a Full-Stack Chat App with React, Firebase, and Optional Backend Uploads

Creating a full-fledged real-time chat application may sound complex at first, but with the power of Firebase and React, it becomes surprisingly manageable—even beginner-friendly. In this tutorial, we'll build a chat app that supports:

- Authentication (Firebase Auth)
- Real-time messaging (Firestore)
- State management (Zustand)
- Optional image upload backend (Node.js + Multer + ImgUr)

This guide is tailored for developers who are familiar with the basics of React and want to learn how to structure and build a robust chat application step by step.

---

## 🏗️ Project Overview

- **Frontend**: React.js + Zustand (state management)
- **Backend**: Firebase (Firestore, Storage & Authentication)
- **Optional Backend**: Express + Multer (for image uploads)
- **Media Storage**: ImgUr or Cloudinary

> **Note:** I haven't used Firebase Storage in this project because it's not available in the free Spark plan. You'll need to upgrade your billing plan to access it.  
> If you'd like to use Firebase Storage instead of a custom backend for file uploads, follow this guide: [Firebase Storage Setup](https://surl.li/zdvglo)

---

## 🔐 Step 1: Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable **Email/Password Authentication**.
4. Create a **Firestore Database** (start in test mode for now).

Install Firebase SDK:
```bash
npm install firebase
```

Configure Firebase:
```js
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore();
```

---


## 👤 Step 2: Set Up Authentication  
**(We will create two collections in Firestore while registering any user)**

When a new user signs up, we not only authenticate them using Firebase Authentication, but we also need to store their basic profile data in Firestore. For that, we create two collections:

1. `users` — This holds static information like  username, email, avatar, id and an empty array of blocked users. It helps you retrieve public-facing user info without querying Firebase Auth repeatedly.

2. `userChats` — This is a dynamic collection that stores metadata about each chat the user is involved in. It allows you to quickly fetch a user's conversation list with details like last message, timestamp, and participant info.

Creating these two collections at the time of registration lays the foundation for everything else in the app: real-time messaging, contact lists, and chat syncing.


```js
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import fileUpload from '../lib/fileUpload';

export const RegisterUser = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });

  const handleAvatar = async (e) => {

    const file = e.target.files[0];


    if (!file) return; 
    const uploadedUrl = await fileUpload(file);

    if (uploadedUrl) {
      setAvatar({
        file,
        url: uploadedUrl,
      });
    } else {
      console.error('Upload failed');
    }
  };

export const handleRegister = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);

   const res = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked: []
      })

      await setDoc(doc(db, 'userChats', res.user.uid), {
        chats: []
      })
};
}

export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
```

> To get the fileUpload code and complete backend code (express, multer) see step 9 and 10
---


## 📦 Step 3: Zustand for State Management

```bash
npm install zustand
```

Create a simple store:
```js
// useUserStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
```

---

## 🧱 Step 4: Firestore Collections

- `/users/{uid}` → User profile
- `/userChats/{uid}` → Metadata of user’s chats
- `/chats/{chatId}` → Actual chat messages

Example:
```json
/users/abc => { email, name }
/userChats/abc => { chats: [{ chatId, user, lastMessage, updatedAt }] }
/chats/chat123 => { messages: [{ senderId, text, createdAt }] }
```

---

## 👥 Step 5: Fetch and Display Contacts

```js
import { collection, getDocs } from 'firebase/firestore';

export const fetchAllUsers = async () => {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
};
```

---

## 💬 Step 6: Create or Load Chat

Check if chat exists, otherwise create:
```js
import { doc, setDoc, updateDoc, getDoc, collection } from 'firebase/firestore';

const createOrLoadChat = async (sender, receiver) => {
  const senderRef = doc(db, 'userChats', sender._id);
  const receiverRef = doc(db, 'userChats', receiver._id);

  const ensureUserChatsExist = async (ref) => {
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, { chats: [] });
    }
  };

  await Promise.all([ensureUserChatsExist(senderRef), ensureUserChatsExist(receiverRef)]);

  const senderSnap = await getDoc(senderRef);
  const existingChat = senderSnap.data().chats.find(
    (chat) => chat.user.id === receiver._id
  );

  if (existingChat) return existingChat.chatId;

  const newChatRef = doc(collection(db, 'chats'));
  await setDoc(newChatRef, { messages: [], createdAt: Date.now() });

  const metadata = (user, chatId) => ({
    chatId,
    user: {
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
      photoURL: user.profileImageURL || '',
    },
    lastMessage: '',
    updatedAt: Date.now(),
    isSeen: false,
  });

  await Promise.all([
    updateDoc(senderRef, { chats: [...(senderSnap.data().chats || []), metadata(receiver, newChatRef.id)] }),
    updateDoc(receiverRef, { chats: [...(senderSnap.data().chats || []), metadata(sender, newChatRef.id)] }),
  ]);

  return newChatRef.id;
};
```

---

## 📡 Step 7: Real-Time Chat Listener

```js
import { onSnapshot } from 'firebase/firestore';

useEffect(() => {
  const unSub = onSnapshot(doc(db, 'chats', chatId), (docSnap) => {
    if (docSnap.exists()) {
      setMessages(docSnap.data().messages);
    }
  }); 

  return () => unSub();
}, [chatId]);
```

---

## ✉️ Step 8: Sending Messages

```js
const sendMessage = async (chatId, messageText, sender, receiver) => {
  const message = {
    id: Date.now(),
    text: messageText,
    senderId: sender._id,
    createdAt: Date.now(),
  };

  await updateDoc(doc(db, 'chats', chatId), {
    messages: arrayUnion(message),
  });

  const getUpdatedChatMetadata = (user, isSeen = true) => ({
    chatId,
    user: {
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role || '',
      photoURL: user.profileImageURL || '',
    },
    lastMessage: message.text,
    updatedAt: Date.now(),
    isSeen,
  });

  await Promise.all([
    updateDoc(doc(db, 'userChats', sender._id), {
      chats: arrayUnion(getUpdatedChatMetadata(receiver, true)),
    }),
    updateDoc(doc(db, 'userChats', receiver._id), {
      chats: arrayUnion(getUpdatedChatMetadata(sender, false)),
    }),
  ]);
};
```

---

## 🖼️ Step 9: Optional Backend (Node.js + Multer + ImgUr)

Instead of Firebase Storage, you can upload to ImgUr.

### Express Route:
```js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const { StatusCodes } = require('http-status-toolkit');
const { notFoundHandler, globalErrorHandler, asyncHandler } = require('express-error-toolkit');
require('dotenv').config();

const app = express();
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Route
app.post(
  '/api/v1/upload',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'No file received' });
    }

    const fileBuffer = req.file.buffer;

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'twineChat_firebase',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: 'Upload failed' });
        }
        return res.status(StatusCodes.OK).json({ url: result.secure_url });
      }
    );

    stream.end(fileBuffer);
  })
);
```

---

## 🔒 Firestore Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /userChats/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /chats/{chatId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🚀 Final Thoughts

- Use Firestore’s real-time capabilities to sync chats instantly.
- Zustand is a great minimal choice for global state.
- Avoid unnecessary chat duplication by properly managing metadata.
- Extend image support via Node.js if Firebase Storage is not an option.

This tutorial should provide a solid foundation for building production-ready real-time messaging apps with React and Firebase.

Happy coding!
