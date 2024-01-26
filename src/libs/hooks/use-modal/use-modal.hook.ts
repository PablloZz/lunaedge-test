import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleModalOpen = () => {
    setIsModalOpen(previousState => !previousState);
  };

  return {
    handleOpenModal,
    handleCloseModal,
    handleToggleModalOpen,
    isModalOpen,
  };
};

export { useModal };
