import { List } from 'react-native-paper';

export default function sessionDescription({session}: any) {
    
    return (
        <>
        {
            session.realizedExercices.map((ex: any) => 
                {
                let weights: any[] = ex.sets.map ((set: any) => set.weight);
                let reps: any[] = ex.sets.map((set: any) => set.reps);
                let numberSets: number = weights.length;
                let quickDescription = `${ex.exercise}  ${numberSets} x ${weights.join('-')}kg x ${reps.join('-')}`;
                return (
                    <List.Item key={ex.exercise} title={quickDescription}/>
                )
                }
            )
        } 
        </>
    )

}