import SectionButtons from '@/app/components/workouts/sectionButtons';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';


export default function WorkoutsLayout() {

    const theme = useTheme();
    const styles = createStyles(theme);

    return (
          <View style={styles.container}>
              <SectionButtons/>
              <Slot/>
          </View>
      );
  }
  
  const createStyles = (theme: MD3Theme) => StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: theme.colors.background,
      },
  })
  