---
title: Firebase Cheat Sheet
description: >-
  Firebase cheat sheet is the collection of most frequently used functions and
  codes that are used while working with firebase firestore and functions
date: 2025-11-10T00:00:00.000Z
featureImage: /public/uploads/firebase-feature.jpeg
author: Izzaz
tags:
  - firebase
  - firestore
  - firebase functions
slug: firebase-cheat-sheet
---

This is the set of firebase most used functions and code of  JavaScript SDK that is used while working with firebase project. 

I have create the list with the basic codes or commands that can be used easily when working with firebase firestore, authentication or firebase functions.

First install firebase-cli globally in your computer using the command:

```bash
npm i firebase-tools -g
```

This is Firebase Command Line Interface (CLI) Tools that is used to test, manage, and deploy your Firebase project from the command line

***

## Install and Initialize firebase in a Project

Now, if you are working in a project, the you have to add firebase in your project by using the command:

```bash
npm install firebase
```

It will install firebase in your project. Next get your config file and make a firebase.js file in your project.

```javascript
// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

```

Once it is set, now you can work on your project with firebase firestore.

***

## Add Document in Firebase (addDoc) 

```javascript
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // your firebase config file

async function addUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Jim Halpert",
      role: "Sales Representative",
      atOffice: false,
      createdAt: new Date(),
    });

    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

addUser();

```

This will add the document to the users collection.

## Set Document in Firebase (setDoc)

```javascript
import { collection, doc, setDoc } from "firebase/firestore";

async function addMultipleUsers() {
  const usersRef = collection(db, "users");

  await setDoc(doc(usersRef, "user1"), {
    name: "Jim Halpert",
    role: "Sales Representative",
    atOffice: false,
  });


  console.log("Users added!");
}

addMultipleUsers();

```

This will set the document in users collection of firebase.

[Firebase Documentation](https://firebase.google.com/docs/firestore/query-data/queries#example_data)
