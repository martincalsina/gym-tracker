import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

export default function RoutineCard({ routine }: any) {

    return (
        <Card key={routine.id} style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">{routine.name}</Text>
                <Text variant="bodyMedium">{routine.note}</Text>
            </Card.Content>
            <Card.Cover style={styles.cardImage} source={{ uri: routine.image }} />
            <Card.Actions style={styles.optionsContainer}>
                <Button>More</Button>
                <Button>Go</Button>
            </Card.Actions>
        </Card>
    )

}

const styles = StyleSheet.create({
    card: {
        marginTop: 15, 
    },
    cardImage: {
        marginHorizontal: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});