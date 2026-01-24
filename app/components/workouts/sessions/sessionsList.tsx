import { Session } from '@/app/db/model/Session';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SessionDescription from './sessionDescription';

type Props = {
  sessionsData: Session[];
}

export default function SessionsList({sessionsData}: Props  ) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <SafeAreaView>
      <FlatList
        data={sessionsData}
        renderItem={({item}) => (
          <List.Accordion
              title={`${item.date} - RUTINA`}
              description={item.tag?.name}
              expanded={expandedId === item.id?.toString()}
              onPress={() =>
                setExpandedId(
                  expandedId === item.id!.toString() ? null : item.id!.toString()
                )
              }
          >
            <SessionDescription session={item}/> 
          </List.Accordion>  
        )}
        keyExtractor={(item)=> item.id!.toString()}
      />
    </SafeAreaView>
  );
}
