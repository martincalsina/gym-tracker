import { Routine } from '@/app/db/model/Routine';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import DeleteRoutineButton from './deletion/deleteRoutineButton';
import EditRoutineButton from './edition/editRoutineButton';

type Props = {
    routine: Routine
}

const DEFAULT_COVER: string = "@/assets/images/noun-squat.png";

export default function RoutineCard({ routine }: Props) {

    const coverSource = routine.cover != DEFAULT_COVER ? { uri: routine.cover }
                        : require(DEFAULT_COVER);


    return (
        <Card key={routine.id} style={styles.card}>
            <Card.Content>
                <Text variant="titleLarge">{routine.name}</Text>
                <Text variant="bodyMedium">{routine.description}</Text>
            </Card.Content>
            <Card.Cover style={styles.cardImage} source={coverSource} />
            <Card.Actions style={styles.optionsContainer}>
                <EditRoutineButton routine={routine}/>
                <DeleteRoutineButton routine={routine}/>
            </Card.Actions>
        </Card>
    )

}

const styles = StyleSheet.create({
    card: {
        marginBottom: 15, 
    },
    cardImage: {
        marginHorizontal: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});