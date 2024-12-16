import React, { useState } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);

  const createAlbum = () => {
    const newAlbum = { id: albums.length, name: `Альбом ${albums.length + 1}`, photos: [] };
    setAlbums([...albums, newAlbum]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Альбом', { album: item })}>
            <Text style={styles.album}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.buttonContainer}> 
        <Button title="Создать Альбом" onPress={createAlbum} />  
      </View> 
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  album: {
    padding: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#2196F3',

  },
  buttonContainer: { 
    padding: 10, 
  },
});

export default HomeScreen;
