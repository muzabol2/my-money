import {
  EmailAuthProvider,
  User,
  updatePassword as firebaseUpdatePassword,
  reauthenticateWithCredential,
  updateProfile,
} from "firebase/auth";

const reauthenticate = async (user: User, password: string) => {
  try {
    const credential = EmailAuthProvider.credential(user.email as string, password);

    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

const updatePassword = (user: User, newPassword: string) => firebaseUpdatePassword(user, newPassword);

const updateDisplayName = (user: User, displayName: string) => updateProfile(user, { displayName });

export default {
  reauthenticate,
  updatePassword,
  updateDisplayName,
};
