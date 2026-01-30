import { editRoutine, EditRoutineData, Routine } from '@/app/db/model/Routine';
import RoutineFormModal from '../shared/routineFormModal';

type Props = {
    routine: Routine;
    modalVisible: boolean;
    setModalVisible: ((arg: boolean) => void);
}

export default function EditRoutineModal({routine, modalVisible, setModalVisible}: Props) {

    async function onSave(name: string, description: string, cover: string) {
 
      let editedRoutine: EditRoutineData = {
          id: routine.id,
          name: name,
          description: description,
          cover: cover,
        };
        await editRoutine(editedRoutine);
 
    }

    return (
        <RoutineFormModal 
          title={"Edit Routine"}
          defaultName={routine.name}
          defaultDescription={routine.description}
          defaultCover={routine.cover}
          onSave={onSave}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />        
    )
}
