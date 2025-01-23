// App.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from "../../constants";
import {signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Profile = () => {

  const { user, setUser, setIsLogged } = useGlobalContext();


  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full pt-10 px-4">
      {/* Header Section */}


      {/* Profile Section */}
      <View className="items-center mb-6">
      <View className="relative w-24 h-24 border border-secondary rounded-full  flex justify-center items-center">
          <Image
            source={{ uri: user?.avatar }} // Replace with actual image URL
            className="w-[90%] h-[90%] rounded-full"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-secondary p-2 rounded-full">
          <Image
            source={icons.pencil}
            className="w-4 h-4"
            resizeMode="contain"
          />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-lg font-semibold mt-2">{user?.username}</Text>
        <Text className="text-gray-400">{user?.email}</Text>

      </View>

      {/* Menu Options */}
      <View className="w-full flex-1 px-4 pt-6 pb-2">
        <MenuItem   icon = {icons.privacy} label="Privacy" />
        <MenuItem   icon = {icons.help} label="Help & Support" />
        <MenuItem   icon = {icons.settings}label="Settings" />
        <MenuItem  onPress={logout} icon = {icons.logut} label="Logout" />
      </View>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, label,  onPress}) => (
  <TouchableOpacity onPress={onPress}  className="flex-row justify-between items-center bg-gray-300 py-4 px-6 rounded-2xl mb-4">
    <View className="flex-row items-center">
    <Image
            source={icon}
            className="w-5 h-5 mr-4"
            resizeMode="contain"
          />
      <Text className="text-white text-lg">{label}</Text>
    </View>
    <Image
            source={icons.next}
            className="w-4 h-4"
            resizeMode="contain"
          />
  </TouchableOpacity>
);

export default Profile;
