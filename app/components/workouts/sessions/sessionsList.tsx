import { Session } from '@/app/db/model/Session';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import DeleteSessionButton from './deletion/deleteSessionButton';
import EditSessionButton from './edition/editSessionButton';
import SessionDescription from './sessionDescription';

type Props = {
  sessionsData: Session[];
}

export default function SessionsList({sessionsData}: Props  ) {

  const [expandedId, setExpandedId] = useState<string | null>(null);

  function dateToString(date: Date) {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  } 

  return ( 

      <FlatList
        data={sessionsData}
        style={styles.container}
        renderItem={({item}) => (
          <>
              <View style={styles.buttonsContainer}>
                  <EditSessionButton session={item}/>
                  <DeleteSessionButton session={item}/>    
              </View>
              <List.Accordion
                  title={`${dateToString(item.date)} - ${item.routine.name}`}
                  contentStyle={styles.sessionTitle}
                  description={item.tag?.name}
                  expanded={expandedId === item.id.toString()}
                  onPress={() =>
                    setExpandedId(
                      expandedId === item.id.toString() ? null : item.id!.toString()
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
        position: 'relative',
  },
  buttonsContainer: {
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    //width: '100%',
    top: 8,
    justifyContent: 'flex-start',
  },
  sessionTitle: {
    left: 85
  }
})