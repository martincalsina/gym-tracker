import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';

export default function Workouts() {

  const theme = useTheme();
  const styles = createStyles(theme);
  
  return (
    <View style={styles.container}>
      <Text variant='titleLarge'>Manage your workout sessions.</Text>
      <Text variant='titleSmall'>Select a tab to start.</Text>
    </View>
  );
}

const createStyles = (theme: MD3Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.onBackground
  }
})