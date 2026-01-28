import { Routine } from '@/app/db/model/Routine';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import DeleteRoutineButton from './deletion/deleteRoutineButton';
import EditRoutineButton from './edition/editRoutineButton';

type Props = {
    routine: Routine
}

export default function RoutineCard({ routine }: Props) {

    return (
        <Card key={routine.id} style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">{routine.name}</Text>
                <Text variant="bodyMedium">{routine.description}</Text>
            </Card.Content>
            <Card.Cover style={styles.cardImage} source={{ uri: routine.cover }} />
            <Card.Actions style={styles.optionsContainer}>
                <EditRoutineButton routine={routine}/>
                <DeleteRoutineButton routine={routine}/>
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