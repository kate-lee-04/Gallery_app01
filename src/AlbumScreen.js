import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AlbumScreen = ({ route }) => {
  const { album } = route.params;
  const [photos, setPhotos] = useState(album.photos);

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    savePhotos();
  }, [photos]);

  const savePhotos = async () => {
    try {
      await AsyncStorage.setItem(`@album_${album.id}`, JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to save photos.', e);
    }
  };

  const loadPhotos = async () => {
    try {
      const savedPhotos = await AsyncStorage.getItem(`@album_${album.id}`);
      if (savedPhotos !== null) {
        setPhotos(JSON.parse(savedPhotos));
      }
    } catch (e) {
      console.error('Failed to load photos.', e);
    }
  };

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newUri = result.assets[0].uri;
      setPhotos([...photos, newUri]);
      album.photos = [...photos, newUri];
    } else {
      alert('Вы не выбрали изображение!');
    }
  };

  const removePhoto = (uri) => { 
    const updatedPhotos = photos.filter(photo => photo !== uri); 
    setPhotos(updatedPhotos); 
  };

  return ( 
    <View style={styles.container}> 
      <ScrollView contentContainerStyle={styles.scrollContainer}> 
        <View style={styles.photoGrid}> 
          {photos.map((uri, index) => ( 
            <View key={index} style={styles.photoContainer}> 
              <Image source={{ uri }} style={styles.photo} /> 
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => removePhoto(uri)} > 
                  <Text style={styles.deleteButtonText}>X</Text> 
              </TouchableOpacity> 
            </View> 
          ))} 
        </View> 
      </ScrollView>
      <View style={styles.buttonContainer}> 
        <Button title="Добавить Фото" onPress={addPhoto} /> 
      </View> 
    </View> 
  );
};

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
  }, 
  scrollContainer: { 
    flexGrow: 1,
    padding: 10, 
  },
  photoGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
  }, 
  photoContainer: { 
    position: 'relative', 
  },
  photo: { 
    width: 120, 
    height: 120, 
    margin: 5, 
    borderRadius: 5,
  }, 
  
  deleteButton: { 
    position: 'absolute', 
    top: 5, 
    right: 5, 
    backgroundColor: '#393939', 
    borderRadius: 50, 
    width: 20, 
    height: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  deleteButtonText: { 
    color: 'white',
    fontSize: 12, 
  }, 
  buttonContainer: { 
    padding: 10, 
  },
});

export default AlbumScreen;
