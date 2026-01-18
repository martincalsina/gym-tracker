import { useState } from 'react';
import { List } from 'react-native-paper';
import SessionDescription from './sessionDescription';

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
            <SessionDescription session={session}/> 
        </List.Accordion>
      ))}
    </List.Section>
  );
}
