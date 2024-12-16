import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import AlbumScreen from './src/AlbumScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Галерея">
        <Stack.Screen name="Галерея" component={HomeScreen} />
        <Stack.Screen 
          name="Альбом" 
          component={AlbumScreen} 
          options={({ route }) => ({ title: route.params.album.name })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
