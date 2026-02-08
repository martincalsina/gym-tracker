import { RealizedExercise } from '@/app/db/model/RealizedExercise';
import { createSession, CreateSessionData } from '@/app/db/model/Session';
import SessionFormModal from '../shared/sessionFormModal';


type Props = {
    modalVisible: boolean;
    setModalVisible: ((arg: boolean) => void);
}

export default function CreateSessionModal({modalVisible, setModalVisible}: Props) {

  async function onSave(date: Date, realizedExercises: RealizedExercise[], routine_id: number) {

    const createdSession: CreateSessionData = {
      date: date,
      tag: null,
      realizedExercises: realizedExercises,
      routine_id: routine_id
    }

    await createSession(createdSession);

  }

  return (
    <SessionFormModal 
      title={"Create a new session"}
      onSave={onSave}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  )

}