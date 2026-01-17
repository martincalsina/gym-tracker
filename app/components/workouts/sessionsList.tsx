import { useState } from 'react';
import { Text, View } from 'react-native';
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
          <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
            <Text>hola</Text>
          </View>
        </List.Accordion>
      ))}
    </List.Section>
  );
}
