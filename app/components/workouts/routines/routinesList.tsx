import { Routine } from "@/app/db/model/Routine";
import { FlatList } from "react-native";
import RoutineCard from "./routineCard";

type Props = {
    routines: Routine[];
}

export default function RoutinesList({routines}: Props) {

    return (
        <>
            <FlatList                            
                data={routines}
                keyExtractor={(item) => item.id!.toString()}
                renderItem={({ item }) => (
                       <RoutineCard routine={item} />
                )}
            />
        </>
    )

}