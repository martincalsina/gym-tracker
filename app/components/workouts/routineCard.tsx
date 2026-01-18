import { Button, Card, Text } from 'react-native-paper'

export default function RoutineCard({ routine }: any) {

    return (
        <Card key={routine.id} style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">{routine.name}</Text>
                <Text variant="bodyMedium">{routine.note}</Text>
            </Card.Content>
            <Card.Cover style={styles.cardImage} source={{ uri: routine.image }} />
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>
    )

}

const styles = {
    card: {
        marginTop: 15,
    },
    cardImage: {
        marginHorizontal: 10,
    }
}