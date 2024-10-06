import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, Text, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import Post from '../../minicomps/Post';
import { logout } from "../../../../server/actions/userAction";
import { Ionicons } from '@expo/vector-icons';
import { createPost } from "../../../../server/actions/postActions";
import { POST_CREATE_RESET } from "../../../../server/constants/postConstants";
const Community = () => {
  // Local state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [navigated, setNavigated] = useState(false);
  
  const postCreate = useSelector((state) => state.postCreate);
  const { success: successPost, loading:loadingPost, error:errorPost, post } = postCreate;


  // Hooks
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigatedRef = useRef(false);

  // Redux state
  const followUserState = useSelector((state) => state.userFollow) || {};
  const { error: errorFollow, success: successFollow } = followUserState;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const postCommentCreate = useSelector((state) => state.postCommentCreate);
  const { success: successCreate } = postCommentCreate;

  useEffect(() => {
    if (!userInfo && !navigatedRef.current) {
      const interval = setInterval(() => {
        if (!navigatedRef.current) {
          logoutHandler();
          navigatedRef.current = true;
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [userInfo, navigation]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(`https://squareapi.pythonanywhere.com/api/v1/gallery/?name=${searchText}&page=${page}`, config);
      setPosts((prevPosts) => [...prevPosts, ...response.data.results]);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchData();
    }
    if (successFollow) {
      handleRefresh();
    }
  }, [userInfo, page, successFollow, successCreate]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    // fetchData();
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const submiterHandler = () => {
    dispatch(createPost())

  };


  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET });

    // if (success) {
    //   navigate(`/new/${post.id}`);
    // }
  }, [dispatch, userInfo, post]);



  useEffect(() => {
    if (successPost) {
      navigation.navigate('NewPost', { newId: post?.id })
    }
  }, [successPost, navigation]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setPosts([]);
    await fetchData();
    setRefreshing(false);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 50 }}>
      <Post
        date={formatTimestamp(item.created_date)}
        user={item.user}
        caption={item.caption}
        description={item.description}
        total_likes={item.total_likes}
        total_bookmarks={item.total_bookmarks}
        total_comments={successCreate ? item.total_comments + 1 : item.total_comments}
        avi={item.user_avi}
        name={item.user_name}
        id={item.id}
        likers={item.likers}
        bookers={item.bookers}
        comments={item.comments}
        currentUserEmail={userInfo?.email}
        poster={item}
      />
    </View>
  );

  const renderFooter = () => {
    if (loading) return <ActivityIndicator color="red" />;
    return (
      <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
        <Ionicons name="arrow-down-circle-outline" size={32} color="red" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={{  minHeight: Dimensions.get('window').height }}>
        {!userInfo ? (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.button}
            >
              <Text >Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          
          <View style={styles.screen}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text onPress={handleRefresh} style={styles.heading}>
                Community Social Feed
              </Text>
              <Ionicons name="book-sharp" size={24} color="red" style={{ marginLeft: 8 }} />
            </View>
            {loadingPost ? (
        <ActivityIndicator size="large" color="brown" />
      ) : (
        



            <TouchableOpacity onPress={submiterHandler} style={{ alignItems: 'center' }}>
          

          <Ionicons name="add" size={24} color="red" />
        </TouchableOpacity>

        
      )}



            {loading && posts.length === 0 ? (
              <ActivityIndicator color='red' />
            ) : posts.length === 0 ? (
              <View style={styles.noPostsContainer}>
                <Text style={styles.noPostsText}>
                  Looks Like There Is nothig on the timeline yet.
                </Text>

              </View>
            ) : (
              <>
                <FlatList
                  data={posts}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0}  // Trigger onEndReached when reaching the bottom
                  ListFooterComponent={renderFooter}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  contentContainerStyle={styles.contentContainer}
                />
                {/* <View style={styles.loadMoreContainer}>
                  <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                    <Ionicons name="arrow-down-circle-outline" size={32} color="red" />
                    <Text style={styles.loadMoreText}>Load More</Text>
                  </TouchableOpacity>
                </View> */}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    // color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    // color: 'white',
    fontSize: 16,
  },
  noPostsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noPostsText: {
    // color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  loadMoreContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  loadMoreButton: {
    alignItems: 'center',
    padding: 10,
  },
  loadMoreText: {
    // color: 'white',
    marginTop: 5,
  },
});

export default Community;

