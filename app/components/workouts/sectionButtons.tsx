import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

export default function SectionButtons() {

    const router = useRouter();
    const [value, setValue] = useState('');

    return (
        <View style={styles.container}>
            <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
            {
                value: 'routines',
                label: 'Routines',
                onPress: (() => {router.navigate('/workouts/routines')}),
            },
            {
                value: 'sessions',
                label: 'Sessions',
                onPress: (() => {router.navigate('/workouts/sessions')}), 
            },
            { 
                value: 'exercises', 
                label: 'Exercises',
                onPress: (() => {router.navigate('/workouts/exercises')}),
            },
            ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})