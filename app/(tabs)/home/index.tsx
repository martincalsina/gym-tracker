import SessionDescription from "@/app/components/workouts/sessions/listing/sessionDescription";
import { getLastSession, Session } from "@/app/db/model/Session";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  
  const theme = useTheme();
  const styles = createStyles(theme);

  const [lastWorkout, setLastWorkout] = useState<Session | null>(null);
  
    function dateToString(date: Date) {
      return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    } 


  useEffect(() => {

    async function loadData() {

      const lastWorkoutData = await getLastSession();
      setLastWorkout(lastWorkoutData);

    }

    loadData();

  }, [])
  
  return (

    <SafeAreaView style={styles.container}>
      
      <View style={styles.upperPartContainer}>
          <ScrollView style={styles.lastWorkoutContainer}>
            {lastWorkout == null 
            ? (<Text>Last workout data</Text>) 
            : ( 
              <>
                <Text style={styles.title} variant="titleMedium">{"LAST WORKOUT"}</Text>
                <Text style={styles.date}>{`${dateToString(lastWorkout.date)} - ${lastWorkout.routine.name}`}</Text>
                <SessionDescription session={lastWorkout}/>
                </>
              )}
          </ScrollView>
      </View>

      <View style={styles.lowerPartContainer}>
        <View style={styles.previousWorkoutContainer}>
          <Text>What I did on this day the previous week</Text>
        </View>

        <View style={styles.mostImprovedExerciseContainer}>
          <Text>Most improved exercise</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}

const createStyles = (theme: MD3Theme) => StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
  },
  upperPartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.roundness,
    width: '100%'
  },
  lowerPartContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    gap: 10,
    justifyContent: 'center',
  },
  lastWorkoutContainer: {
    height: "100%",
    width: "100%",
  },
  previousWorkoutContainer: {
    flex: 1,
    height: "100%",
    flexBasis: 0, 
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mostImprovedExerciseContainer: {
    flex: 1,
    height: "100%",
    flexBasis: 0,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.onSurfaceVariant,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  date:{
    color: theme.colors.onSurface,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  text: {
    color: theme.colors.onBackground
  }
})
