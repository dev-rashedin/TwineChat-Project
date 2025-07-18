### ✅ **Firebase React Chat App – Development Steps**

#### **1. User Registration Creates Firestore Data**

- When a user registers, two documents are created:
    
    - A `users` document with profile data.
        
    - A `userChats` document initialized with an empty `chats: []` array.
        

#### **2. State Management with Zustand**

- Zustand is used to store the logged-in user's data globally using `useUserStore`.
    

#### **3. Auth Listener**

- Firebase's `onAuthStateChanged` is used to keep track of whether a user is logged in or out and update Zustand accordingly.
    

#### **4. Fetching All Users for Chat**

- When showing potential chat participants, all users are fetched from the `users` collection except the current user.
    

#### **5. Real-time Listener on userChats**

- A `useEffect` hook sets up an `onSnapshot` listener on the `userChats` document of the logged-in user to get real-time updates on chat metadata (e.g. latest messages, timestamps).
    

#### **6. Creating or Loading a Chat**

- When a user initiates a chat:
    
    - It checks if a chat between the two users already exists in the sender’s `userChats`.
        
    - If not, a new document is created in the `chats` collection.
        
    - Metadata is added to both users’ `userChats` documents.
        

#### **7. Real-time Listener for Chat Messages**

- `onSnapshot` is also used on the individual chat document inside the `chats` collection to listen for new messages.
    

#### **8. Zustand `useChatStore` to Manage Chat State**

- Chat state (selected chat and `chatId`) is managed using another Zustand store (`useChatStore`), which is updated when a user clicks a contact.
    

#### **9. Selecting a Contact**

- When a contact is clicked:
    
    - `chatId` is set using Zustand.
        
    - The chat window updates to show the messages for that particular chat.
        

#### **10. Sending Messages**

- When a message is sent:
    
    - It is pushed to the `messages` array inside the correct `chats` document.
        
    - The `userChats` metadata is also updated for both users to show the latest message.
        

#### **11. `hasRunRef` to Prevent Multiple Chat Creations**

- A `useRef` (`hasRunRef.current`) is used to prevent the `createOrLoadChat` logic from running multiple times on first render.
    

#### **12. Fetching and Displaying Contacts**

- Contacts are pulled from the `userChats` doc.
    
- Data is de-duplicated and sorted by `updatedAt`.
    

#### **13. ContactBox Click to Load Chat**

- On clicking a contact, the relevant `chatId` is loaded and its messages are fetched and shown.
    

#### **14. Sending Messages via Enter Key**

- Users can send a message by pressing Enter, not just clicking the button.