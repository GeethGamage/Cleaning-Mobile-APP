import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";


export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.maryhill.housekeeeping",
    projectId: "6782958b002b2691b2ab",
    databaseId: "6782976f001cc9c809cb",
    userCollectionId:"678297dc003a59d5af31",
    lostAndFoundCollectionId:"6783ffc4002b4e41ceab",
    storageId:"67829c6a003339494e0b"
  };


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  // const { mimeType, ...rest } = file;
  // const asset = { type: mimeType, ...rest };

  const fileAttributes = {
    name: file.name || "image.jpg",  // Default name if not present
    type: file.type || "image/jpeg",  // Default to image/jpeg if type not specified
    size: file.size || 0,  // File size (optional but useful)
    uri: file.uri || file.uri,  // The URI for the file
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      fileAttributes
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createLostAndFound(form) {
  try {
    console.log(form.created_date);
    const [itemImageUrl] = await Promise.all([
      uploadFile(form.item_image, "image"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.lostAndFoundCollectionId,
      ID.unique(),
      {
        room_no: form.room_no,
        item_image: itemImageUrl,
        item_name: form.item_name,
        creator: form.userId,
        created_date: form.created_date
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}


// Get all Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.lostAndFoundCollectionId,
      [Query.orderDesc("created_date")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchPosts(query) {
  try {
    console.log(query);
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.lostAndFoundCollectionId,
      [Query.search("room_no", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

