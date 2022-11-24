
import { AppointmentType } from '@types'
import { MdClose } from 'react-icons/md'

export const RequirementModal = ({
  appointmentType,
  onCancel,
}: {
  appointmentType: AppointmentType
  onCancel: Function
}) => {
  return (
    <div className="fixed z-30 bg-black/25 backdrop-blur-sm w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="w-3/4 bg-white p-6 shadow-2xl rounded-2xl">
        <div className="flex justify-between items-start">
          <div className="mb-4">
            <p className="text-sm text-gray-400 font-medium">
              Requirement File For
            </p>
            <p className="text-sm font-semibold">
              <span className="text-gray-700">{appointmentType.title}</span>
            </p>
          </div>

          <button
            className="text-gray-400 text-2xl hover:text-gray-600"
            onClick={() => onCancel()}
          >
            <MdClose />
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: appointmentType.emailContent }}></div>
      </div>
    </div>
  )
}
