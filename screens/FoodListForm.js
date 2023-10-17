import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Headers from '../components/ListHeader';
import ImagePicker from 'react-native-image-crop-picker';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import PictureButton from '../components/PictureButton';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {Picker} from '@react-native-picker/picker';
import {useRoute} from '@react-navigation/native';

export default function FoodListForm() {
  const route = useRoute();
  console.log(route);
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(
    route.params.type == 'edit' ? route.params.data.postImage : '',
  );
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [productName, setProductName] = useState(
    route.params.type == 'edit' ? route.params.data.postProductName : '',
  );
  const [price, setPrice] = useState(
    route.params.type == 'edit' ? route.params.data.postPrice : '',
  );
  const [city, setCity] = useState(
    route.params.type == 'edit' ? route.params.data.postCity : '',
  );
  const [sellerName, setSellerName] = useState(
    route.params.type == 'edit' ? route.params.data.postSellerName : '',
  );
  const [phoneNumber, setPhoneNumber] = useState(
    route.params.type == 'edit' ? route.params.data.postPhoneNumber : '',
  );
  const [description, setDescription] = useState(
    route.params.type == 'edit' ? route.params.data.postDescription : '',
  );

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 600,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = image.path;
      setImage(imageUri);
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 600,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    if (route.params.type == 'edit') {
      const updateImage =
        route.params.data.postImage != null ? image : imageUrl;
      firestore()
        .collection('FoodPosts')
        .doc(route.params.data.id)
        .update({
          userId: route.params.data.userId,
          postImage: updateImage,
          postProductName: productName,
          postPrice: price,
          postSellerName: sellerName,
          postCity: city,
          postPhoneNumber: phoneNumber,
          postDescription: description,
        })
        .then(() => {
          console.log('Post Added');
          Alert.alert(
            'Image uploaded!',
            'Your image has been uploaded to the firebase cloud storage successfully',
          );
        })
        .catch(error => {
          console.log('Something went wrong to store in firestore', error);
        });
    } else {
      const imageUrl = await uploadImage();
      console.log('Image URL ', imageUrl);

      firestore()
        .collection('FoodPosts')
        .add({
          userId: user.uid,
          postImage: imageUrl,
          postProductName: productName,
          postPrice: price,
          postTime: firestore.Timestamp.fromDate(new Date()),
          postSellerName: sellerName,
          postCity: city,
          postPhoneNumber: phoneNumber,
          postDescription: description,
        })
        .then(() => {
          console.log('Post Added');
          setProductName('');
          setPrice('');
          setSellerName('');
          setPhoneNumber('');
          setDescription('');
          setCity('');
        })
        .catch(error => {
          console.log('Something went wrong to store in firestore', error);
        });
    }
  };

  const uploadImage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage('');
      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the firebase cloud storage successfully',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const animalCity = [
    {label: 'City', value: ''},
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Islamabad', value: 'Islamabad'},
  ];

  return (
    <View style={styles.container}>
      <Headers heading="Food listing Form" />
      <ScrollView>
        <View style={styles.bannarView}>
          <TouchableOpacity onPress={takePhotoFromCamera}>
            {image ? (
              <Image source={{uri: image}} style={styles.camera} />
            ) : (
              <Image
                source={require('../assets/camera.png')}
                style={styles.dummyCamera}
              />
            )}
          </TouchableOpacity>
        </View>
        <PictureButton onPress={choosePhotoFromLibrary} />
        <CustomTextInput
          placeholder={'Product Name'}
          value={productName}
          onChangeText={txt => {
            setProductName(txt);
          }}
          height={50}
        />
        <CustomTextInput
          placeholder={'Price'}
          value={price}
          onChangeText={txt => {
            setPrice(txt);
          }}
          height={50}
        />
        <CustomTextInput
          placeholder={'Seller Name'}
          value={sellerName}
          onChangeText={txt => {
            setSellerName(txt);
          }}
          height={50}
        />
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
            style={styles.dropdown}>
            {animalCity.map((type, index) => (
              <Picker.Item
                key={index}
                label={type.label}
                value={type.value}
                color="gray"
              />
            ))}
          </Picker>
        </View>
        {/* <CustomTextInput
            placeholder={'City'}
            value={city}
            onChangeText={txt => {
              setCity(txt);
            }}
            height={50}
          /> */}
        <CustomTextInput
          placeholder={'Phone Number'}
          value={phoneNumber}
          onChangeText={txt => {
            setPhoneNumber(txt);
          }}
          height={50}
        />
        <CustomTextInput
          placeholder={'Description'}
          value={description}
          onChangeText={txt => {
            setDescription(txt);
          }}
          height={100}
          // Enable multiline input
        />
        {uploading ? (
          <View style={styles.loader}>
            <Text>{transferred} % Completed</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <CustomButton onPress={submitPost} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannarView: {
    width: 360,
    height: 200,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  camera: {
    width: 340,
    height: 180,
  },
  dummyCamera: {
    height: 50,
    width: 50,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    height: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  dropdown: {
    paddingHorizontal: 16,
  },
});
