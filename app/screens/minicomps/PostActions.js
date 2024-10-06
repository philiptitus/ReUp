import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, createLike, createBookmark, checkExpiredPosts  } from '../../../server/actions/postActions';

import { Modal, PaperProvider } from 'react-native-paper';


const PostActions = ({currentuseremail, posteremail ,likers, comments,id, showModal}) => {
  // State to manage the active state of each icon
  const [commentActive, setCommentActive] = useState(false);
  const [likeActive, setLikeActive] = useState(false);
  const [bookmarkActive, setBookmarkActive] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [visible, setVisible] = React.useState(false);

const navigation = useNavigation()
    const handleLongPress = () => {
      console.log('Long Press', 'You have triggered a long press action!');
    };


const dispatch = useDispatch()
  // Function to handle icon click for comment
  const handleCommentClick = () => {
    showModal
  };

  // Function to handle icon click for like
  const handleLikeClick = () => {
    setLikeActive(!likeActive); // Toggle like active state
    dispatch(createLike(id));
    dispatch(checkExpiredPosts())

};




const handleDelete = () => {
dispatch(deletePost(id))
navigation.navigate('Profile')
};




  useEffect(() => {
    if (Array.isArray(likers)) {
      setLikeActive(likers.some(liker => liker.liker_name === currentuseremail));
    } else {
      setLikeActive(false);
    }
    
    // Log a message when the component is loaded

  }, [currentuseremail, likers]);






  useEffect(() => {
    if (Array.isArray(comments)) {
      setCommentActive(comments.some(commenter => commenter.comment_email === currentuseremail));
    } else {
      setCommentActive(false);
    }
    
    // Log a message when the component is loaded

  }, [currentuseremail, comments]);

  return (
    <View>


 









    <View style={styles.iconRow}>
      {/* Comment Icon */}
      <TouchableOpacity
      
      onLongPress={() => navigation.navigate('Comments', { postId: id})}
      onPress={() => navigation.navigate('Comments', { postId: id}) } style={styles.icon}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color={commentActive ? 'red' : 'brown'} />
      </TouchableOpacity>
      
      {/* Like Icon */}
      <TouchableOpacity 
      onLongPress={() => navigation.navigate('Likes', { postId: id})}
      onPress={handleLikeClick} style={styles.icon}>
        <Ionicons name="heart-outline" size={24} color={likeActive ? 'red' : 'brown'} />
      </TouchableOpacity>
      


      
            {currentuseremail === posteremail && 
      <TouchableOpacity

      onPress={handleDelete} style={styles.icon}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
      }
    </View>


    </View>

  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10, // Add margin if needed
  },
  icon: {
    marginRight: 10,
    // Add margin between icons if needed
  },
  modal: {
    backgroundColor: 'brown',
    padding: 20,
    justifyContent: 'left',
    alignItems: 'left',
  },
});

export default PostActions;
