import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, ListCard, GuideCard, PostCard } from "../../components";
import { router } from "expo-router";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const publicAreaCheckList = [
    { id: "1", name: "How to clean the Play Ground", uri: images.playground  },
    { id: "2", name: "How to clean the Pool Club", uri: images.poolclub  },
    { id: "3", name: "How to clean the Reception", uri: images.reception  },
    { id: "4", name: "How to clean the Resturent", uri: images.resturent }
  ];

  const roomCheckList = [
    { id: "1", name: "How to clean the Room", uri: images.room  },
    { id: "2", name: "How to clean the Toilet", uri: images.toilet  }
  ];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };


  const handleCardPress = (id) => {
    router.push(`/cards/${id}`);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={roomCheckList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            itemImage={item.uri}
            itemName={item.name}
            onPress={() => handleCardPress(item.id)}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex  px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Maryhill Housekeeping
                </Text>
              </View>

              <View className="mt-0.5">
                <Image
                  source={images.logoSmall}
                  className="w-11 h-12"
                  resizeMode="contain"
                />
              </View>
            </View>



            <View className="w-full flex-1 pt-4 pb-4">
              <Text className="text-xl font-pmedium text-gray-100 mb-1">
                Public area Cleaning
              </Text>

              <GuideCard posts={publicAreaCheckList ?? []} />
            </View>

  
              <Text className="text-xl font-pmedium text-gray-100 mt-5">
                Room Cleaning
              </Text>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
