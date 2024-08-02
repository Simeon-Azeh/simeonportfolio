import React from 'react';
import { Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

const ProjectDrawer = ({ project, onClose }) => {
  return (
    <Transition show={true} className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <Transition.Child
          enter="transition ease-in-out duration-500 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className="absolute inset-0 bg-white dark:bg-dark-body shadow-xl rounded-t-lg">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <button onClick={onClose} className="text-xl">
                <FaTimes />
              </button>
            </div>
            <div className="p-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p>{project.description}</p>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default ProjectDrawer;
