/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";

const MainModal = ({ modalOpen, setModalOpen, children }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition show={modalOpen} as={Fragment} appear>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        initialFocus={cancelButtonRef}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black opacity-60" />

        {/* Modal Content */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative bg-main rounded-lg shadow-xl p-10 w-full max-w-2xl border border-border">
            {children}

            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-5 w-10 h-10 flex items-center justify-center text-base bg-white rounded-full text-subMain hover:text-white hover:bg-subMain transition duration-500 ease-in-out"
              type="button"
            >
              <IoClose size={24} />
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MainModal;
