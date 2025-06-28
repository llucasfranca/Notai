import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 3,  
      duration: 6000, 
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);
  
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/img/Logo.jpg')} 
        style={[
          styles.image,
          { transform: [{ scale: scaleAnim }] }, 
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    backgroundColor: '#000000',
  },

  image: {
    width: 200, 
    height: 200, 
  },
});

export default SplashScreen;
