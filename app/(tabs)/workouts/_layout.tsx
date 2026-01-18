import SectionButtons from '@/app/components/workouts/sessions/sectionButtons';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';


export default function WorkoutsLayout() {
      return (
          <View style={styles.container}>
              <SectionButtons/>
              <Slot/>
          </View>
      );
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
      },
  })
  