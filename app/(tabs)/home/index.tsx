import SessionDescription from "@/app/components/workouts/sessions/listing/sessionDescription";
import { getMostFrequentRoutine, Routine } from "@/app/db/model/Routine";
import { getLastSession, getSessionOnDate, Session } from "@/app/db/model/Session";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  
  const today = new Date();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [lastWorkout, setLastWorkout] = useState<Session | null>(null);
  const [previousWeekWorkout, setPreviousWeekWorkout] = useState<Session | null>(null);
  const [mostFrequentRoutine, setMostFrequentRoutine] = useState<Routine | null>(null); 
  const defaultRoutineCover = require("@/assets/images/noun-squat.png");
  
  function dateToString(date: Date) {
     return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  } 

  function subtractAWeek(date: Date) {
    const d = new Date(date);
    d.setDate(d.getDate() - 7);
    return d;
  }

  useEffect(() => {

    async function loadData() {

      const lastWorkoutData = await getLastSession();
      setLastWorkout(lastWorkoutData);
    
      const previousWeek = subtractAWeek(today);
      const todayPreviousWeekData = await getSessionOnDate(previousWeek);
      setPreviousWeekWorkout(todayPreviousWeekData);

      const mostFrequentRoutineData = await getMostFrequentRoutine();
      setMostFrequentRoutine(mostFrequentRoutineData);
      
    }

    loadData();

  }, [])
  
  return (

    <SafeAreaView style={styles.container}>
      
      <View style={styles.upperPartContainer}>
          <Text style={styles.title} variant="titleMedium">LAST WORKOUT</Text>
            {lastWorkout == null 
            ? (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholder} variant="bodyMedium">Here you will see your last session.</Text>
              </View>
            ) 
            : ( 
              <>
                <Text style={styles.date} variant="labelSmall">{`${dateToString(lastWorkout.date)} - ${lastWorkout.routine.name}`}</Text>
                <ScrollView style={styles.lastWorkoutContainer}>
                  <SessionDescription session={lastWorkout} />
                </ScrollView>
              </>
              )}
          
      </View>

      <View style={styles.lowerPartContainer}>
        <View style={styles.previousWorkoutContainer}>
          <Text style={styles.title} variant="labelSmall">{`PREVIOUS ${today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}`}</Text>
          {previousWeekWorkout == null
          ? (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholder} variant="bodySmall">Here you will see your previous week session.</Text>
              </View>
          )
          : (
            <>
                <Text style={styles.date} variant="bodySmall">{`${dateToString(previousWeekWorkout.date)} - ${previousWeekWorkout.routine.name}`}</Text>
                <ScrollView style={styles.lastWorkoutContainer}>
                  <SessionDescription titleStyle={{fontSize: 13}} descriptionStyle={{fontSize: 9}}
                  session={previousWeekWorkout} />
                </ScrollView>
            </>
          )}
        </View>

        <View style={styles.mostFrequentRoutineContainer}>
          <Text style={styles.title} variant="labelSmall">MOST FREQUENT ROUTINE</Text>
          {mostFrequentRoutine == null
          ? (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholder} variant="bodySmall">Here you will see your most followed routine.</Text>
              </View>
          )
          : (
            <>
              <Text variant="bodySmall" style={styles.routineName}>{mostFrequentRoutine.name}</Text>
              <View style={styles.coverContainer}>
                <Image 
                  style={styles.mostFrequentRoutineCover}
                  source={
                    mostFrequentRoutine.cover.startsWith("@") 
                    ? defaultRoutineCover
                    : {uri: mostFrequentRoutine.cover}
                  } />
              </View>
                
            </>
          )}  
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
    alignItems: 'center',
  },
  mostFrequentRoutineContainer: {
    flex: 1,
    height: "100%",
    flexBasis: 0,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.roundness,
    alignItems: 'center',
  },
  routineName: {
    color: theme.colors.onSurfaceVariant,
  },
  coverContainer: {
    padding: 10,
    width: "100%",
    height: "100%",
  },
  mostFrequentRoutineCover: {
    width: "100%",
    height: 160,
    borderRadius: theme.roundness
  },
  title: {
    color: theme.colors.primary,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlign: 'center'
  },
  date:{
    color: theme.colors.onSurfaceVariant,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    textAlign: "center",
  },
  text: {
    color: theme.colors.onBackground
  }
})
