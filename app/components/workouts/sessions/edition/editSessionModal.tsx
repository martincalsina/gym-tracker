import { RealizedExercise } from "@/app/db/model/RealizedExercise";
import { editSession, EditSessionData, Session } from "@/app/db/model/Session";
import SessionFormModal from "../shared/sessionFormModal";

type Props = {
    session: Session;
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
}

export default function EditSessionModal({session, modalVisible, setModalVisible}: Props) {
 
    async function onSave(date: Date, realizedExercises: RealizedExercise[], routine_id: number) {

        const editedSession: EditSessionData = {
            id: session.id,
            date: date,
            tag: null,
            realizedExercises: realizedExercises,
            routine_id: routine_id
        };

        await editSession(editedSession);

    }

    return (
      <SessionFormModal 
        title={"Edit a Session"}
        defaultDate={session.date}
        defaultRealizedExercises={session.realizedExercises}
        defaultRoutine={session.routine.id}
        onSave={onSave}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    )

}