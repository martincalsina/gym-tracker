import { Session } from '@/app/db/model/Session';
import { useState } from 'react';
import { List } from 'react-native-paper';
import SessionDescription from './sessionDescription';

type Props = {
  sessionsData: Session[];
}

export default function SessionsList({sessionsData}: Props  ) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <List.Section>
      {sessionsData.map(session => (
        <List.Accordion
          key={session.id}
          title={`${session.date} - RUTINA`}
          description={session.tag?.name}
          expanded={expandedId === session.id?.toString()}
          onPress={() =>
            setExpandedId(
              expandedId === session.id!.toString() ? null : session.id!.toString()
            )
          }
        >
            <SessionDescription session={session}/> 
        </List.Accordion>
      ))}
    </List.Section>
  );
}
