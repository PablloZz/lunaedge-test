import { Button, Icon, Portal } from "../components.js";

type Properties = {
  children: React.ReactNode;
  title: string;
  description?: string;
  onClose: () => void;
};

const Modal: React.FC<Properties> = ({
  children,
  title,
  description,
  onClose,
}) => {
  return (
    <Portal>
      <div className="absolute w-full h-screen left-0 top-0 z-10 bg-[#b8b2b280]" />
      <div
        role="dialog"
        aria-labelledby="modal-title"
        className="fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] flex flex-col max-w-[50%] lg:w-1/2 lg:max-w-[650px] h-[500px] bg-white rounded-md pt-7 px-6 pb-4 z-20 overflow-y-auto shadow-lg"
      >
        <h2
          id="modal-title"
          className="flex items-center justify-between gap-4 text-xl font-bold mb-5"
        >
          {title}
          <button onClick={onClose}>
            <Icon
              iconName="close"
              className="text-black hover:text-gray-500 w-[1.2em]"
            />
          </button>
        </h2>
        <div className="grow flex flex-col gap-3">{children}</div>
        <div className="relative flex items-center gap-4 before:absolute before:top-[-20px] before:-left-6 before:-right-6 before:h-[1px] before:bg-indigo-200">
          <span className="grow">{description}</span>
          <Button
            type="button"
            variant="text"
            label="Cancel"
            onClick={onClose}
          />
          <Button
            type="button"
            variant="primary"
            label="Save"
            onClick={onClose}
          />
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
