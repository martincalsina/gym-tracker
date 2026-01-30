import { Exercise } from '@/app/db/model/Exercise';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from "react-native-paper";
import DeleteExerciseButton from './deletion/deleteExerciseButton';

type Props = {
    exercise: Exercise;
}

export default function ExerciseCard({exercise}: Props) {
    return (
        <Card key={exercise.id} style={styles.card}>
            <Card.Content>
                <Text variant="titleSmall">{exercise.name}</Text>
            </Card.Content>
            <Card.Cover style={styles.cardImage} source={{ uri: exercise.cover }} />
            <View style={styles.buttonsContainer}>
                {!exercise.isDefault && <DeleteExerciseButton exercise={exercise}/>}
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        padding: '1%',
        margin: '1%',
    },
    cardImage: {
        width: '100%',
        height: 160,
    },
    buttonsContainer: {
        flexDirection: 'row',
    }
})