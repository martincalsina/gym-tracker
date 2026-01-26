import { Session } from '@/app/db/model/Session';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import DeleteSessionButton from './deletion/deleteSessionButton';
import SessionDescription from './sessionDescription';

type Props = {
  sessionsData: Session[];
}

export default function SessionsList({sessionsData}: Props  ) {

  const [expandedId, setExpandedId] = useState<string | null>(null);

  return ( 

      <FlatList
        data={sessionsData}
        style={styles.container}
        renderItem={({item}) => (
          <>
              <View style={styles.buttonsContainer}>
                  <IconButton onPress={() => {}} size={20} icon='pencil-outline'/>
                  <DeleteSessionButton session={item}/>
                  
              </View>
              <List.Accordion
                  title={`${item.date} - RUTINA`}
                  contentStyle={styles.sessionTitle}
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
          </>
        )}
        keyExtractor={(item)=> item.id!.toString()}
      />
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    top: 8,
    justifyContent: 'flex-start',
  },
  sessionTitle: {
    left: 85
  }
})