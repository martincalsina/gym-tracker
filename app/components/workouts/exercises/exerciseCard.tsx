import { Exercise } from '@/app/db/model/Exercise';
import { imageRegistry } from '@/assets/images/exercises/imageRegistry';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from "react-native-paper";
import DeleteExerciseButton from './deletion/deleteExerciseButton';
import EditExerciseButton from './edition/editExerciseButton';

type Props = {
    exercise: Exercise;
}


export default function ExerciseCard({exercise}: Props) {

    const coverSource = (exercise.cover.startsWith("file://") || exercise.cover.startsWith("content://")) ? { uri: exercise.cover }
                        : imageRegistry[exercise.cover];
    
    return (
        <Card key={exercise.id} style={styles.card}>
            <Card.Content>
                <Text variant="titleSmall">{exercise.name}</Text>
            </Card.Content>
            <Card.Cover style={styles.cardImage} source={coverSource} />
            <View style={styles.buttonsContainer}>
                <EditExerciseButton exercise={exercise}/>
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