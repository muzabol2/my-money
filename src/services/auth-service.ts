import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
  updateProfile,
  User,
} from "firebase/auth";

async function reauthenticate(user: User, password: string) {
  try {
    const credential = EmailAuthProvider.credential(
      user.email as string,
      password
    );

    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}

function updatePassword(user: User, newPassword: string) {
  return firebaseUpdatePassword(user, newPassword);
}

function updateDisplayName(user: User, displayName: string) {
  return updateProfile(user, { displayName });
}

export default {
  reauthenticate,
  updatePassword,
  updateDisplayName,
};
