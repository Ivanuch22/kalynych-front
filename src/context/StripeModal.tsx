import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

import { StatusEnums } from "../enums";
import { IUser } from "@/interfaces/user.interfaces";

type StatusType = {
  status: StatusEnums;
  modalWithTokenOpen: boolean;
  modalStripeOpen: boolean;
  buyMeADrinkModal: boolean;
  user: IUser | null;
  modalConciergOpen: boolean;
  setModalStripeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: (status: StatusEnums) => void;
  setUser: (user: IUser) => void;
  setBuyMeADrinkModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalWithTokenOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalConciergOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = createContext<StatusType>({} as StatusType);

const StripeModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<StatusEnums>(StatusEnums.Inactive);
  const [modalStripeOpen, setModalStripeOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [buyMeADrinkModal, setBuyMeADrinkModal] = useState<boolean>(false);
  const [modalWithTokenOpen, setModalWithTokenOpen] = useState<boolean>(false);
  const [modalConciergOpen, setModalConciergOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user?.id) {
      setStatus(userStatusFromString(user?.status));
    }
  }, [user]);

  const userStatusFromString = (statusString: string): StatusEnums => {
    switch (statusString) {
      case "Active":
        return StatusEnums.Active;
      case "Inactive":
        return StatusEnums.Inactive;
      case "Requested":
        return StatusEnums.Requested;
      case "Pending Profile":
        return StatusEnums.PendingProfile;
      case "Pending Payment":
        return StatusEnums.PendingPayment;
      case "Pending Assignment":
        return StatusEnums.PendingAssignment;
      default:
        return StatusEnums.Inactive;
    }
  };

  return (
    <Context.Provider
      value={{
        modalWithTokenOpen,
        status,
        user,
        buyMeADrinkModal,
        modalStripeOpen,
        modalConciergOpen,
        setStatus,
        setModalStripeOpen,
        setUser,
        setBuyMeADrinkModal,
        setModalWithTokenOpen,
        setModalConciergOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StripeModalProvider;

export const useStripeModal = () => useContext(Context);
