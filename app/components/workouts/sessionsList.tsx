import { useState } from 'react';
import { List } from 'react-native-paper';

type Props = {
  sessionsData: any[];
}

export default function SessionsList({sessionsData}: Props  ) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <List.Section>
      {sessionsData.map(session => (
        <List.Accordion
          key={session.id}
          title={`${session.date} - ${session.routine}`}
          description={session.tag}
          expanded={expandedId === session.id}
          onPress={() =>
            setExpandedId(
              expandedId === session.id ? null : session.id
            )
          }
        >
            { 
              session.realizedExercices.map((ex: any) => {
                let weights: any[] = ex.sets.map ((set: any) => set.weight);
                let reps: any[] = ex.sets.map((set: any) => set.reps);
                let numberSets: number = weights.length;
                let quickDescription = `${ex.exercise}  ${numberSets} x ${weights.join('-')}kg x ${reps.join('-')}`;
                return (<List.Item
                  title={quickDescription}
                />)
              })
            } 
        </List.Accordion>
      ))}
    </List.Section>
  );
}
