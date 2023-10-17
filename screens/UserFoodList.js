import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import ListHeader from '../components/ListHeader';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import storage from '@react-native-firebase/storage';
export default function UserFoodList() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const route = useRoute();
  const {userId} = route.params;
  const fetchPosts = async () => {
    try {
      const List = [];
      await firestore()
        .collection('FoodPosts')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          console.log('Total Petspost', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {
              postProductName,
              postCity,
              postDescription,
              postImage,
              postPhoneNumber,
              postPrice,
              userId,
              postSellerName,
            } = doc.data();
            List.push({
              id: doc.id,
              postImage: postImage,
              postPrice: postPrice,
              postCity: postCity,
              postProductName: postProductName,
              postDescription: postDescription,
              postPhoneNumber: postPhoneNumber,
              userId: userId,
              postSellerName: postSellerName,
            });
          });
        });
      console.log('List', List);
      setPosts(List);
      if (loading) {
        setLoading(false);
      }
      console.log('posts', List);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isFocused]);
  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);
  const deletePost = postId => {
    console.log('Current post id', postId);
    firestore()
      .collection('FoodPosts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImage} = documentSnapshot.data();

          if (postImage != null) {
            const storageRef = storage().refFromURL(postImage);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImage} has been deleted successfully.`);
                deleteFirestoreData(postId);
                setDeleted(true);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };
  const deleteFirestoreData = postId => {
    firestore()
      .collection('FoodPosts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'your post has been published Successfully',
        );
      })
      .catch(e => console.log('Error deleting post.', e));
  };
  const DATA = [
    {
      id: '1',
      productName: 'Nature Powder',
      productCity: 'Islamabad',
      phoneNumber: '098765543',
      sellerName: 'Ali',
      price: '700',
      description:
        'jkjfkjkjfbvkjvkjvkjvkfnvkjfvkfjbvkvkjbvkfjbvkfjbvkfbvkfjbvkjfbvkfjbvkfjvkfjbvkfjvjfbfjbvfjbvjfbfjbkfj',
    },
    {
      id: '2',
      productName: 'Nature Powder',
      productCity: 'Islamabad',
      phoneNumber: '098765543',
      sellerName: 'Ali',
      price: '700',
      description:
        'jkjfkjkjfbvkjvkjvkjvkfnvkjfvkfjbvkvkjbvkfjbvkfjbvkfbvkfjbvkjfbvkfjbvkfjvkfjbvkfjvjfbfjbvfjbvjfbfjbkfj',
    },
    {
      id: '3',
      productName: 'Nature Powder',
      productCity: 'Islamabad',
      phoneNumber: '098765543',
      sellerName: 'Ali',
      price: '700',
      description:
        'jkjfkjkjfbvkjvkjvkjvkfnvkjfvkfjbvkvkjbvkfjbvkfjbvkfbvkfjbvkjfbvkfjbvkfjvkfjbvkfjvjfbfjbvfjbvjfbfjbkfj',
    },
  ];
  const renderItem = ({item}) => (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item.postImage}} />
      <View style={styles.value}>
        <Text style={styles.heading}>Product Name: </Text>
        <Text style={styles.text}>{item.postProductName}</Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.heading}>Price: </Text>
        <Text style={styles.text}>{item.postPrice}</Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.heading}>City: </Text>
        <Text style={styles.text}>{item.postCity}</Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.heading}>Seller: </Text>
        <Text style={styles.text}>{item.postSellerName}</Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.heading}>Phone Number: </Text>
        <Text style={styles.text}>{item.postPhoneNumber}</Text>
      </View>
      <View style={styles.desValue}>
        <Text style={styles.heading}>Description: </Text>
        <Text style={styles.descText}>{item.postDescription}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FoodListForm', {
              data: item,
              type: 'edit',
            });
          }}>
          <Image
            source={require('../assets/edit-button.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deletePost(item.id)}>
          <Image
            source={require('../assets/bin.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.main}>
      <ListHeader heading="User Food List" />
      <View style={{marginBottom: 120}}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          key={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginBottom: 40,
  },
  container: {
    marginTop: 20,
    backgroundColor: '#E2FC9B',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  image: {
    height: 200,
    width: 330,
    marginBottom: 3,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  text: {
    color: 'black',
  },
  desValue: {
    marginVertical: 3,
  },
  descText: {
    color: 'black',
    lineHeight: 20,
  },
  line: {
    marginTop: 5,
    backgroundColor: 'black',
    height: 2,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
