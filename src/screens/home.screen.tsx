import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import { faComment, faPaperPlane } from 'nvquang-font-icon/pro-light-svg-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Alert
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import { BrandText } from '../components/HeaderBack/BrandText';
import { FirebaseModel } from '../constant';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getListComment, getListPost, loginGoogleAction, realtimeDatabaseReference } from '../stores/auth/auth.actions';
import { colors } from '../styles/colors';
import { setDataComment, setDataPost } from '../stores/auth/auth.slice';
const widthS = Dimensions.get('window').width
const heightS = Dimensions.get('window').height
const HomeScreen = React.memo(() => {
  const [comment, setComment] = useState('')
  const [indexFocus, setIndexFocus] = useState(-1)
  const [modalVisible, setModalVisible] = useState(false)
  const [postModalVisible, setPostModalVisible] = useState(false)
  const dispatch = useTypedDispatch()
  const loginWithGoogle = async () => {
    dispatch(loginGoogleAction())
  };


  useEffect(() => {
    dispatch(getListPost())
    dispatch(getListComment())
  }, [])

  const postData = useTypedSelector((state) => state.auth.post)
  const comments = useTypedSelector((state) => state.auth.comments)
  const user = useCurrentUser()

  // const createPost = async (): Promise<void> => {
  //   const id = uuidv4();
  //   try {
  //     realtimeDatabaseReference.ref(FirebaseModel.POST + '/' + id)
  //       .set({
  //         image: 'https://firebasestorage.googleapis.com/v0/b/socialdemo-4dc96.appspot.com/o/8130454.jpg?alt=media&token=f58c5247-bbab-49c5-a11a-3ee6f8964464',
  //         displayName: user?.displayName,
  //         userPhotoUrl: user?.photoURL,
  //         createdAt: moment().format(),
  //         updatedAt: moment().format(),
  //         totalComments: 0
  //       })
  //       .then(() => console.log('Data set.')).catch((err) => {
  //         console.log(err)
  //       });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };
  // console.log('post', postData)
  useEffect(() => {
    const onChildAdd = realtimeDatabaseReference
      .ref(FirebaseModel.COMMENT)
      .on('child_added', snapshot => {
        const key = snapshot.key
        const findIndex = comments.findIndex((item) => item.id === key)
        if (findIndex < 0) {
          const currentList: any[] = [...comments]
          currentList.unshift({ ...snapshot.val(), id: key, })
          dispatch(setDataComment(currentList))
        }
      });

    // Stop listening for updates when no longer required
    return () => realtimeDatabaseReference.ref(FirebaseModel.COMMENT).off('child_added', onChildAdd);
  }, [user, comments, dispatch, setDataComment]);

  const sendComment = async (id): Promise<void> => {
    try {
      realtimeDatabaseReference.ref(FirebaseModel.POST + '/' + id).once('value')
        .then(async snapshot => {
          const postInfo = await snapshot.val();
          const idComment = uuidv4();
          realtimeDatabaseReference.ref(FirebaseModel.COMMENT + '/' + idComment)
            .set({
              displayName: user?.displayName,
              userPhotoUrl: user?.photoURL,
              createdAt: moment().format(),
              updatedAt: moment().format(),
              content: comment.trim(),
              postId: id,
            })
          const newTotalComments = postInfo.totalComments + 1
          realtimeDatabaseReference.ref(FirebaseModel.POST + '/' + id)
            .set({
              ...postInfo,
              totalComments: postInfo.totalComments + 1,
            })

          const listPost: any = [...postData.data]
          for (let i = 0; i < listPost.length; i++) {
            if (listPost[i].id === id) {
              const currentItem = { ...listPost[i], totalComments: newTotalComments }
              listPost[i] = currentItem
            }
          }
          dispatch(setDataPost(listPost))
          setComment('')
          setIndexFocus(-1)
        });

    } catch (error) {
      console.log(error)
    }

    // const id = uuidv4();
    // try {
    //   realtimeDatabaseReference.ref(FirebaseModel.POST + '/' + id)
    //     .set({
    //       image: 'https://firebasestorage.googleapis.com/v0/b/socialdemo-4dc96.appspot.com/o/8130454.jpg?alt=media&token=f58c5247-bbab-49c5-a11a-3ee6f8964464',
    //       displayName: user?.displayName,
    //       userPhotoUrl: user?.photoURL,
    //       createdAt: moment().format(),
    //       updatedAt: moment().format(),
    //       totalComments: 0
    //     })
    //     .then(() => console.log('Data set.')).catch((err) => {
    //       console.log(err)
    //     });
    // } catch (error) {
    //   console.log(error)
    // }
  };

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: colors.borderColor,
          borderBottomWidth: 1,
          paddingTop: 20,
        }}>
        <View style={{ flexDirection: 'row', }}>
          <FastImage source={{
            uri: item.userPhotoUrl
          }} style={styles.imageAvatar} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <BrandText>{item.displayName}</BrandText>
            <BrandText style={{ fontSize: 11 }}>{moment(item.createdAt).format('HH:MM:ss DD/MM/YYYY')}</BrandText>
          </View>
        </View>
        <FastImage resizeMode='stretch' source={{ uri: item.image }} style={styles.imageMain} />
        <View style={styles.viewComment}>
          <View style={styles.input}>
            <TextInput
              style={{ flex: 1 }}
              placeholder={'Send your comment'}
              placeholderTextColor={colors.textGray}
              value={indexFocus === index ? comment : ''}
              onChangeText={(val) => {
                setComment(val)
                setIndexFocus(!val ? -1 : index)
              }}
            />
            {indexFocus === index ? <TouchableOpacity onPress={() => sendComment(item.id)}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                size={18}
                style={{ color: colors.infoColor, position: 'absolute', right: 10, top: -10 }}
              />
            </TouchableOpacity> : null}
          </View>
          <BrandText>{item.totalComments}</BrandText>
          <TouchableOpacity onPress={() => {
            setModalVisible(true)
            setPostModalVisible(item.id)
          }}>
            <FontAwesomeIcon
              icon={faComment}
              size={18}
              style={{ color: colors.btnBack, marginRight: 2, marginLeft: 4 }}
            />
            <BrandText>Click</BrandText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={postData.data ?? []}
        onEndReachedThreshold={1}
        style={{ flex: 1 }}
        keyExtractor={(item: { id: string }, index) => index + ''}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <BrandText>Back</BrandText>
          </TouchableOpacity>
          <FlatList
            data={comments.filter((item) => item.postId === postModalVisible)}
            onEndReachedThreshold={1}
            style={{ flex: 1, marginTop: 10 }}
            keyExtractor={(item: { id: string }, index) => index + ''}
            renderItem={({ item, index }) => {
              return (
                <View style={{ padding: 10 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <FastImage source={{
                      uri: item.userPhotoUrl
                    }} style={styles.imageAvatarComment} />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <BrandText>{item.displayName}</BrandText>
                      <BrandText style={{ fontSize: 11 }}>{item.content}</BrandText>
                    </View>
                  </View>
                </View>
              )
            }}
          />
        </View>

      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  viewComment: {
    height: 40,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 16,
    marginLeft: 4,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
    flex: 1,
  },
  imageMain: {
    width: widthS,
    height: widthS,
    marginTop: 6,
    marginBottom: 6
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  imageAvatarComment: {
    width: 30,
    height: 30,
    borderRadius: 15
  }
});

export default HomeScreen;
