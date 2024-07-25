import { SlashIcon } from '@radix-ui/react-icons'
import React, { FC } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/breadcrumb'

type PageBreadcrumbsProps = {
  items: { label: string; slug?: string }[]
}

export const PageBreadcrumbs: FC<PageBreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumb className="mt-8 mb-10">
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem>
              {item.slug ? (
                <BreadcrumbLink href={item.slug}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index !== items.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
