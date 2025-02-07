import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#2E2E2E] text-[#F1E9E9] p-6 rounded-lg shadow-lg max-w-lg w-full flex-col justify-center items-center">
        <div className="flex text-center justify-between items-center mb-4">
          <h2 className="text-2xl font-bold ">Connect Your Wallet</h2>
          {/* <button
            onClick={onClose}
            className="text-[#F1E9E9] hover:text-[#D9736A] transition duration-300"
          >
            &times;
          </button> */}
        </div>
        <div className="mb-4 flex-col justify-center items-center">
          {children}
        </div>
        <div className="flex justify-end">
          {/* <button
            onClick={onClose}
            className="bg-[#3C2322] text-[#F1E9E9] px-4 py-2 rounded hover:bg-[#2E2E2E] transition duration-300"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
}