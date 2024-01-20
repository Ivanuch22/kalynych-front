import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { usePage } from "@/context/PageNaming";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { FullTextModal } from "./FullTextModal";
import { CreateNewPromptModal } from "./CreateNewPromptModal";
import { ItemsCard } from "./ItemsCard";
import { EditPromptModal } from "./EditPromptModal";

import { PromptsEnums } from "@/enums/promptsEnums";

import api from "@/services/apiService";

import routes from "@/routes";

import styles from "./AdminPage.module.css";

import PlusIcon from "@/assets/cvpage/PlusIcon";

interface IPrompt {
  id: number;
  prompt_text: string;
  option: string;
  created_at: string;
  current: boolean;
}

interface IPrompts {
  resume: IPrompt[];
}

interface ICurrentPrompts {
  latest_prompt_text: IPrompt;
}

const AdminPage: React.FC = () => {
  const { setPageName } = usePage();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalSeeFullText, setModalSeeFullText] = useState<string>("");
  const [modalFullTextOpen, setModalFullTextOpen] = useState<boolean>(false);
  const [modalFullTextId, setModalFullTextId] = useState<number | null>(null);
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [promptToEditId, setPromptToEditId] = useState<number | null>(null);
  const [promptType, setPromptType] = useState<PromptsEnums>(
    PromptsEnums.JobDescription
  );

  const getTextPromptQuery = async () =>
    api
      .get<IPrompts>(`${routes.getTextPrompts}?option=${promptType}`)
      .then((res) => res.data);

  const getCurrentPromptQuery = async () =>
    api
      .get<ICurrentPrompts>(`${routes.getCurrentPrompts}?option=${promptType}`)
      .then((res) => res.data);

  const {
    data: textPrompts,
    isFetching: textPromptsIsFetching,
    isLoading: textPromptsIsLoading,
    refetch: textPromptsRefetch,
  } = useQuery<IPrompts>(["textPromptQuery", promptType], getTextPromptQuery);

  const {
    data: currentPrompts,
    isFetching: currentPromptsIsFetching,
    isLoading: currentPromptsIsLoading,
    refetch: currentPromptsRefetch,
  } = useQuery<ICurrentPrompts>(
    ["currentPromptQuery", promptType],
    getCurrentPromptQuery
  );

  const filteredTextPrompts = useMemo(() => textPrompts ?? [], [textPrompts]);

  const filteredCurrentPrompts = useMemo(() => {
    if (
      typeof currentPrompts === "object" &&
      currentPrompts !== null &&
      Object.keys(currentPrompts)?.length > 0
    ) {
      const { latest_prompt_text } = currentPrompts;

      return latest_prompt_text;
    }
    return [];
  }, [currentPrompts]);

  useEffect(() => {
    setPageName("Prompts");
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSetId = (text: string, id: number) => {
    setModalFullTextId(id);
    setModalSeeFullText(text);
    setModalFullTextOpen(true);
  };

  const handleCloseModalFullText = () => {
    setModalSeeFullText("");
    setModalFullTextOpen(false);
    currentPromptsRefetch();
    textPromptsRefetch();
    currentPromptsRefetch();
  };

  const handleOpenEditModal = (id: number) => {
    setPromptToEditId(id);
    setModalEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setPromptToEditId(null);
    setModalEditOpen(false);
    textPromptsRefetch();
  };

  if (
    textPromptsIsFetching ||
    textPromptsIsLoading ||
    currentPromptsIsFetching ||
    currentPromptsIsLoading
  )
    return (
      <CircularProgress
        sx={{
          color: "#5A3AB6",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={50}
      />
    );

  return (
    <Box
      sx={{
        height: "500px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: " #343a40",
            fontFamily: "Poppins",
            fontSize: "16px;",
            fontWeight: "600",
            lineHeight: "26px",
          }}
        >
          Edit GPT promt
        </Typography>

        <Button
          variant="contained"
          startIcon={<PlusIcon className={styles.img} />}
          onClick={() => setModalOpen(true)}
          sx={{
            backgroundColor: "#5A3AB6",
            height: "20px",
            fontSize: "10px",
            textTransform: "capitalize",
            fontWeight: "400",
            "&:hover": {
              backgroundColor: "#5A3AB6",
            },
          }}
        >
          Create new prompt
        </Button>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "200px",
            marginTop: "8px",
            padding: "24px 12px",
            backgroundColor: "#ffffff",
            borderRadius: "2px",
            boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
          }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "18px",
              fontFamily: "Roboto",
              fontWeight: "500",
              lineHeight: "22px",
            }}
          >
            Intent
          </Typography>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
          >
            <Box
              onClick={() => setPromptType(PromptsEnums.JobDescription)}
              sx={{
                color: "#030303",
                fontSize: "14px",
                fontFamily: "Roboto",
                lineHeight: "22px",
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                padding: "12px 8px",
                cursor: "pointer",
                boxSizing: "border-box",
                userSelect: "none",
                border:
                  promptType === PromptsEnums.JobDescription
                    ? "1px solid #5A3AB6"
                    : "1px solid rgba(3,3,3,0.1)",
              }}
            >
              Organize the Job Description Text into Sections
            </Box>

            <Box
              onClick={() => setPromptType(PromptsEnums.RecommendResume)}
              sx={{
                color: "#030303",
                fontSize: "14px",
                fontFamily: "Roboto",
                lineHeight: "22px",
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                padding: "12px 8px",
                marginTop: "10px",
                cursor: "pointer",
                userSelect: "none",
                border:
                  promptType === PromptsEnums.RecommendResume
                    ? "1px solid #5A3AB6"
                    : "1px solid rgba(3,3,3,0.1)",
              }}
            >
              Recommend Resume for each job
            </Box>

            <Box
              onClick={() => setPromptType(PromptsEnums.Interview)}
              sx={{
                color: "#030303",
                fontSize: "14px",
                fontFamily: "Roboto",
                lineHeight: "22px",
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                padding: "12px 8px",
                marginTop: "10px",
                cursor: "pointer",
                userSelect: "none",
                border:
                  promptType === PromptsEnums.Interview
                    ? "1px solid #5A3AB6"
                    : "1px solid rgba(3,3,3,0.1)",
              }}
            >
              Interview Prep Recommendations
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "24px",
          }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            Current Prompt
          </Typography>

          {Array.isArray(filteredCurrentPrompts) &&
          filteredCurrentPrompts.length ? (
            <Box
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                padding: "12px 14px",
              }}
            >
              {Array.isArray(filteredCurrentPrompts) &&
                filteredCurrentPrompts.map((el: IPrompt) => (
                  <ItemsCard
                    key={el?.id}
                    id={el?.id}
                    prompt_text={el?.prompt_text}
                    option={el?.option}
                    created_at={el?.created_at}
                    onSetId={() => handleSetId(el?.prompt_text, el.id)}
                    openEditModal={handleOpenEditModal}
                  />
                ))}
            </Box>
          ) : (
            "No current prompts"
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "24px",
          }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            Saved Prompts
          </Typography>

          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "2px",
              boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
              padding: "12px 14px",
              height: "460px",
              width: "520px",
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              overflow: "auto",
            }}
          >
            {Array.isArray(filteredTextPrompts) &&
              filteredTextPrompts.map((el: IPrompt) => (
                <ItemsCard
                  id={el.id}
                  current={el.current}
                  key={el?.id}
                  prompt_text={el?.prompt_text}
                  option={el?.option}
                  created_at={el?.created_at}
                  onSetId={() => handleSetId(el?.prompt_text, el.id)}
                  openEditModal={handleOpenEditModal}
                />
              ))}
          </Box>
        </Box>
      </Box>

      <CreateNewPromptModal
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        textPromptsRefetch={textPromptsRefetch}
        currentPromptsRefetch={currentPromptsRefetch}
        promptType={promptType}
      />

      <EditPromptModal
        promptType={promptType}
        isOpen={modalEditOpen}
        handleCloseModal={handleCloseEditModal}
        modalFullTextId={promptToEditId}
      />

      <FullTextModal
        promptType={promptType}
        isOpen={modalFullTextOpen}
        handleCloseModal={handleCloseModalFullText}
        text={modalSeeFullText}
        modalFullTextId={modalFullTextId}
      />
    </Box>
  );
};

export default AdminPage;
