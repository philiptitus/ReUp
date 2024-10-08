import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, Text, Image } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from '@react-navigation/native';
import { listPostDetails } from "../../../server/actions/postActions";

interface ListProps {
  avatar: boolean;
  postId: string;
  user: string;
  total: number;
  showLike?: boolean;
  showBookmark?: boolean;
  showComment?: boolean;
}

const Likes = () => {
  const postDetails = useSelector((state) => state.postDetails);
  const { post, loading, error, success: successPost } = postDetails;
  const [page, setPage] = useState(1);
  const route = useRoute();

  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const { postId } = route.params;

  const postCommentCreate = useSelector((state) => state.postCommentCreate);
  const { success: successCreate } = postCommentCreate;

  const postDelete = useSelector((state) => state.postDelete);
  const { success, error: errorDelete } = postDelete;

  useEffect(() => {
    if (!userInfo && isFocused) {
      navigation.navigate('Login');
    }
  }, [userInfo, isFocused, navigation]);

  useEffect(() => {
    if (userInfo) {
      dispatch(listPostDetails(postId));
      // console.log(post)
    }
  }, [dispatch, postId, success, successCreate, userInfo]);
  



  const dynamicData = post && post.likers ? post.likers.map((liker) => ({
    id: liker.liker,
    text: liker.liker_name,
    imageUrl: "https://squareapi.pythonanywhere.com/" + liker.liker_avi,
  })) : [];

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <TouchableOpacity >

      <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
      <Text style={styles.text}> {item.text}</Text>

      </TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.screen}>
      {loading ? (
        <ActivityIndicator color="red" />
      ) : (
        <View>
        <Text style={styles.text}> Total Likes: {post?.total_likes} </Text>
        <FlatList
          data={dynamicData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator color='red' />}
        />
        </View>
      )}
    </View>
  );
};

export default Likes;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    // backgroundColor: "black"
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    // color: 'white',
    fontSize: 16,
  },
});
