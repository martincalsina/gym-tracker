import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function SectionButtons() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.navigate('/workouts/routines')} style={styles.button}>
                <Text>Routines</Text>
            </Pressable>
            <Pressable onPress={() => router.navigate('/workouts/sessions')} style={styles.button}>
                <Text>Sessions</Text>
            </Pressable>
            <Pressable onPress={() => router.navigate('/workouts/exercises')} style={styles.button}>
                <Text>Exercises</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1/5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#afafafff',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        borderWidth: 5,
        justifyContent: 'center',
    },
})