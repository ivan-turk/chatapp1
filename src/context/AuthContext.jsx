import { createContext, useState, useContext, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const deleteAllMessages = async () => {
  const messagesRef = collection(db, "messages");
  const querySnapshot = await getDocs(messagesRef);
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

// create context
const AuthContext = createContext();

// provider context
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);

  //signin in with google
  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  //signout
  const logout = async () => {
    setUserCount((count) => count - 1);
    await signOut(auth);
  };

  const value = {
    currentUser,
    setCurrentUser,
    signinWithGoogle,
    logout,
  };

  // set current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        setUserCount((count) => count + 1);
      }
    });

    return () => {
      unsubscribe();
      // Check if all users have logged out
      if (userCount === 1) {
        deleteAllMessages();
      }
    };
  }, [userCount]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
