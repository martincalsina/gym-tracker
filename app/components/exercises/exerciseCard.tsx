import { StyleSheet } from 'react-native';
import { Card, Text } from "react-native-paper";

export default function ExerciseCard({exercise}: any) {
    return (
        <Card key={exercise.id} style={styles.card}>
            <Card.Content>
                <Text variant="titleSmall">{exercise.name}</Text>
            </Card.Content>
            <Card.Cover style={styles.cardImage} source={{ uri: exercise.image }} />
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