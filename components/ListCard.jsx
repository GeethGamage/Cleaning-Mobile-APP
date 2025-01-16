import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { format } from "date-fns";
import { icons } from "../constants";

const ListCard = ({ roomNo, creator, avatar, itemName, itemImage, createdDate }) => {

  
  const [play, setPlay] = useState(false);
  const formattedDate = format(new Date(createdDate), 'MMMM dd, yyyy');

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="flex-row font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {roomNo} : {itemName} 
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
        <Text
              className="text-xs text-gray-100 font-pregular"
            >
              {formattedDate}
            </Text>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {(
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: itemImage }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListCard;
