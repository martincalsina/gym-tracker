import { RealizedExercise } from '@/app/db/RealizedExercise';
import { Session } from '@/app/db/Session';
import { List } from 'react-native-paper';

type Props = {
    session: Session;
}

export default function sessionDescription({session}: Props) {
    
    return (
        <>
        {
            session.realizedExercises.map((ex: RealizedExercise) => 
                {
                let weights: number[] = ex.workingSets.map ((set: any) => set.weight);
                let reps: number[] = ex.workingSets.map((set: any) => set.reps);
                let numberSets: number = weights.length;
                let quickDescription = `${ex.exercise.name}  ${numberSets} x ${weights.join('-')}kg x ${reps.join('-')}`;
                return (
                    <List.Item key={ex.exerciseNumber} title={quickDescription}/>
                )
                }
            )
        } 
        </>
    )

}