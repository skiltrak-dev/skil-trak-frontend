// Icons
import { IoMdArrowDroprightCircle } from 'react-icons/io'

// Context
import { useContextBar } from '@hooks'

export const ContextBar = () => {
   const contextBar = useContextBar()

   return !contextBar.off ? (
      <div className="relative z-20">
         <div
            className={`top-[10px] absolute z-20 transition-all duration-300 cursor-pointer ${
               contextBar.isVisible
                  ? 'rotate-0 -left-[15px]'
                  : 'rotate-180 -left-12'
            } opacity-25 hover:opacity-75`}
            onClick={() =>
               contextBar.isVisible ? contextBar.hide() : contextBar.show()
            }
         >
            <IoMdArrowDroprightCircle className="text-3xl" />
         </div>
         <div
            className={`transition-all duration-300 w-[350px] z-0 h-screen border-l border-secondary-dark p-4 top-0 right-0 bg-white remove-scrollbar overflow-y-scroll ${
               contextBar.isVisible
                  ? `translate-x-0 ${contextBar.fixed ? 'fixed' : 'relative'}`
                  : 'translate-x-full absolute'
            }`}
         >
            <div className="relative">
               <div className="flex flex-col gap-y-4">{contextBar.content}</div>
            </div>
         </div>
      </div>
   ) : null
}
