import React from 'react';
import {urlForImage} from "@/sanity/lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/button";
import {Travel} from "@/sanity/types";
import {formatDate} from "@/src/utils";

export function TravelCard({ travel }: { travel: Travel }) {
  const isPassed = new Date(travel.date) < new Date();
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/travels/${travel.slug.current}`}>
        <Image
          className="w-full object-cover"
          src={urlForImage(travel.poster).height(300).width(300).fit('crop').url()}
          height={300}
          width={300}
          alt={travel.poster.alt}
        />
      </Link>
      <div className="p-5">
        <Link href={`/travels/${travel.slug.current}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {travel.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {isPassed && <span className="text-red-300">took place: </span>}
          {formatDate(travel.date)}
        </p>
        <Button asChild>
          <Link href={`/travels/${travel.slug.current}`}>
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
};
