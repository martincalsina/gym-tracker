import { Exercise } from '@/app/db/database';
import { StyleSheet } from 'react-native';
import { Card, Text } from "react-native-paper";

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
    }
})