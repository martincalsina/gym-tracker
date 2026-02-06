import { Session } from "@/app/db/model/Session";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import FilterModal from "./filterModal";

type Props = {
    sessions: Session[];
    setFilteredSessions: (arg: Session[]) => void;
}

export default function FilterSessionsButton({sessions, setFilteredSessions}: Props) {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <FilterModal sessions={sessions} setFilteredSessions={setFilteredSessions} showModal={showModal} setShowModal={setShowModal} />
            <IconButton icon="filter-variant" onPress={() => setShowModal(true)}/>
        </>
    )

}