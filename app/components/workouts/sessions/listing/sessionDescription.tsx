import { RealizedExercise } from '@/app/db/model/RealizedExercise';
import { Session } from '@/app/db/model/Session';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { List } from 'react-native-paper';

type Props = {
    session: Session;
    titleStyle?: StyleProp<TextStyle>; 
    descriptionStyle?: StyleProp<TextStyle>;
}

export default function sessionDescription({session, titleStyle, descriptionStyle}: Props) {
    
    return (
        <>
        {
            session.realizedExercises.map((ex: RealizedExercise) => 
                {
                let weights: number[] = ex.workingSets.map ((set: any) => set.weight);
                let reps: number[] = ex.workingSets.map((set: any) => set.reps);
                let numberSets: number = weights.length;
                let exercise = `${ex.exerciseNumber} - ${ex.exercise.name}`;
                let quickDescription = `${numberSets} x ${reps.join('-')} x ${weights.join('-')}kg`;
                return (
                    <List.Item 
                    key={ex.exerciseNumber} title={exercise} description={quickDescription}
                    titleStyle={[styles.exerciseTitle, titleStyle]} 
                    containerStyle={[styles.container]}
                    descriptionStyle={[styles.exerciseDescription, , descriptionStyle]}
                    />
                )
                }
            )
        } 
        </>
    )

}

const styles = StyleSheet.create({
    exerciseTitle: {
        fontSize: 14,
    },
    container: {
        marginVertical: 0,
    },
    exerciseDescription: {
        paddingLeft: 20,
    }
})