import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible'
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'
import React, { FC } from 'react'

type CollapsibleProps = {
  question: string
  answer: string
}

export const CollapsibleItem: FC<CollapsibleProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
      <CollapsibleTrigger asChild>
        <h4
          className="cursor-pointer flex items-center justify-between w-full p-3 font-medium  text-gray-900 border-b border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 "
          data-accordion-target="#accordion-nested-collapse-body-2"
        >
          {question}
          {isOpen ? (
            <CaretUpIcon className="h-4 w-4" />
          ) : (
            <CaretDownIcon className="h-4 w-4" />
          )}
        </h4>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="p-5">
          <p className="mb-2 text-gray-500">{answer}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
