import useEscapeClose from "@/src/hooks/useEscapeClose";
import useModalStore from "@/src/stores/ModalStore";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalOverlay = ({ onClose }: { onClose: () => void }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  // ModalOverlay  모달의 외부를 클릭했을 때 닫는 기능을 수행하는 부분

  return (
    <div
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Close modal"
      className="fixed inset-0 z-40"
    />
  );
};

interface ModalContainerProps {
  children: ReactNode;
  customClass?: string;
}

const ModalContainer = ({ children, customClass }: ModalContainerProps) => {
  const modalClasses = clsx(
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white shadow-lg",
    "rounded-3xl",
    "flex justify-center",
    customClass,
  );
  return <div className={modalClasses}>{children}</div>;
};

const ModalPotal = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { isModalOpen, setModalClose, modalOptions } = useModalStore();
  useEscapeClose(setModalClose);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (typeof window === "undefined") return null;
  if (!mounted) return null;
  if (!isModalOpen) return null;

  const modalElement = document.getElementById("_modal");

  return (
    <>
      {createPortal(
        <>
          <ModalOverlay onClose={setModalClose} />
          <ModalContainer customClass={modalOptions?.customClass}>
            {children}
          </ModalContainer>
        </>,
        modalElement as HTMLElement,
      )}
    </>
  );
};

export default ModalPotal;
