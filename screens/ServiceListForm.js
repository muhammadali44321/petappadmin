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

export default function ServiceListForm() {
  const route = useRoute();
  console.log(route);
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(
    route.params.type == 'edit' ? route.params.data.postImage : '',
  );
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [clinicName, setClinicName] = useState(
    route.params.type == 'edit' ? route.params.data.postClinicName : '',
  );
  const [name, setName] = useState(
    route.params.type == 'edit' ? route.params.data.postName : '',
  );
  const [profession, setProfession] = useState(
    route.params.type == 'edit' ? route.params.data.postProfession : '',
  );
  const [about, setAbout] = useState(
    route.params.type == 'edit' ? route.params.data.postAbout : '',
  );
  const [services, setServices] = useState(
    route.params.type == 'edit' ? route.params.data.postServices : '',
  );
  const [city, setCity] = useState(
    route.params.type == 'edit' ? route.params.data.postCity : '',
  );
  const [email, setEmail] = useState(
    route.params.type == 'edit' ? route.params.data.postEmail : '',
  );
  const [phoneNumber, setPhoneNumber] = useState(
    route.params.type == 'edit' ? route.params.data.postPhoneNumber : '',
  );
  const [address, setAddress] = useState(
    route.params.type == 'edit' ? route.params.data.postAddress : '',
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
        .collection('ServicePosts')
        .doc(route.params.data.id)
        .update({
          userId: route.params.data.userId,
          postImage: updateImage,
          postName: name,
          postClinicName: clinicName,
          postTime: firestore.Timestamp.fromDate(new Date()),
          postProfession: profession,
          postAbout: about,
          postServices: services,
          postCity: city,
          postEmail: email,
          postPhoneNumber: phoneNumber,
          postAddress: address,
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
        .collection('ServicePosts')
        .add({
          userId: user.uid,
          postImage: imageUrl,
          postName: name,
          postClinicName: clinicName,
          postTime: firestore.Timestamp.fromDate(new Date()),
          postProfession: profession,
          postAbout: about,
          postServices: services,
          postCity: city,
          postEmail: email,
          postPhoneNumber: phoneNumber,
          postAddress: address,
        })
        .then(() => {
          console.log('Post Added');
          setName('');
          setClinicName('');
          setProfession('');
          setAbout('');
          setServices('');
          setPhoneNumber('');
          setEmail('');
          setAddress('');
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
  const professionalStatus = [
    {label: 'Profession/Doctor/Trainer', value: ''},
    {label: 'Doctor', value: 'Doctor'},
    {label: 'Trainer', value: 'Trainer'},
  ];
  const expertCity = [
    {label: 'City', value: ''},
    {label: 'Lahore', value: 'Lahore'},
    {label: 'Islamabad', value: 'Islamabad'},
  ];

  return (
    <View style={styles.container}>
      <Headers heading="Expert listing Form" />
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
          placeholder={'Your Name'}
          value={name}
          onChangeText={txt => {
            setName(txt);
          }}
          height={50}
        />

        <CustomTextInput
          placeholder={'Clinic Name'}
          value={clinicName}
          onChangeText={txt => {
            setClinicName(txt);
          }}
          height={50}
        />
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={profession}
            onValueChange={(itemValue, itemIndex) => setProfession(itemValue)}
            style={styles.dropdown}>
            {professionalStatus.map((type, index) => (
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
            placeholder={'Profession/Doctor/Trainer'}
            value={profession}
            onChangeText={txt => {
              setProfession(txt);
            }}
            height={50}
          /> */}
        <CustomTextInput
          placeholder={'About'}
          value={about}
          onChangeText={txt => {
            setAbout(txt);
          }}
          height={50}
        />
        <CustomTextInput
          placeholder={'Services'}
          value={services}
          onChangeText={txt => {
            setServices(txt);
          }}
          height={75}
        />
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
            style={styles.dropdown}>
            {expertCity.map((type, index) => (
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
          placeholder={'Email'}
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
          height={50}
        />
        <CustomTextInput
          placeholder={'Phone Number'}
          value={phoneNumber}
          type={'number-pad'}
          onChangeText={txt => {
            setPhoneNumber(txt);
          }}
          height={50}
        />
        <CustomTextInput
          placeholder={'Address'}
          value={address}
          onChangeText={txt => {
            setAddress(txt);
          }}
          height={60}
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
