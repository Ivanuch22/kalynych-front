import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { DragDropContext } from "react-beautiful-dnd";

import { Box, CircularProgress } from "@mui/material";

import { Column } from "./Column";

import api from "@/services/apiService";

import routes from "@/routes";

interface DragDropData {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  reason: string;
  mode: string;
  combine: null | {
    draggableId: string;
    droppableId: string;
  };
  destination: {
    droppableId: string;
    index: number;
  };
}

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  status: string | null;
  employer_name: string;
  location: string;
  matching: string;
  gpt_best_cv: string;
  job_overview: string;
  responsibilities: string;
}

interface IKanban {
  jdItem: ICVs[] | undefined;
  // @ts-ignore
  getJobDescRefetch: () => void;
  userId: number | null;
}

interface FormValues {
  status: string;
  id?: string | number;
}

const KanbanView: React.FC<IKanban> = ({
  jdItem,
  getJobDescRefetch,
  userId,
}) => {
  const [saved, setSaved] = useState<ICVs[]>([]);
  const [applied, setApplied] = useState<ICVs[]>([]);
  const [interviewing, setInterviewing] = useState<ICVs[]>([]);
  const [jdId, setjdId] = useState<string | number>("");

  const jdQuery = (data: FormValues) =>
    api
      .patch(`${routes.changeStatusMinusToken}${data.id}/`, data)
      .then((res) => res.data);

  const { mutateAsync: createJd, isLoading: jdIsLoading } = useMutation(
    "jdQuery",
    (data: FormValues) => jdQuery(data),
    {
      onSuccess: () => {
        toast.success("JD has been successfully updated");
        location.reload();
      },
    }
  );

  useEffect(() => {
    jdItem?.forEach((item) => {
      switch (item.status) {
        case "Saved":
          setSaved((prevSaved) => [...prevSaved, item]);
          break;
        case "Applied":
          setApplied((prevApplied) => [...prevApplied, item]);
          break;
        case "Interviewing":
          setInterviewing((prevInterviewing) => [...prevInterviewing, item]);
          break;
        default:
          break;
      }
    });
  }, [jdItem]);

  const handleDragEnd = (result: DragDropData) => {
    const { destination, source, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;
    const itemId = draggableId;
    setjdId(itemId);
    if (+destination.droppableId === 1) {
      const data = {
        status: "Saved",
        id: itemId,
        user_id: userId,
      };
      createJd(data);
    } else if (+destination.droppableId === 2) {
      const data = {
        status: "Applied",
        id: itemId,
        user_id: userId,
      };
      createJd(data);
    }
  };

  if (jdIsLoading)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={50} />;
  return (
    // @ts-ignore
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          width: "1150px",
          marginTop: "24px",
        }}
      >
        <Column title={"Not Yet Applied"} jd={saved} id={"1"} />
        <Column title={"Applied"} jd={applied} id={"2"} />
      </Box>
    </DragDropContext>
  );
};

export default KanbanView;
