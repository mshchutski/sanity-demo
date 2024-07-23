'use client'

import React from 'react';
import {urlForImage} from "@/sanity/lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/button";

export function ArticleCard({ article }: { article: any }) {

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/articles/${article.slug.current}`}>
        <Image
          className="w-full object-cover"
          src={urlForImage(article.poster).height(300).width(300).fit('crop').url()}
          height={300}
          width={300}
          alt={article.poster.alt}
        />
      </Link>
      <div className="p-5">
        <Link href={`/articles/${article.slug.current}`}>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {article.title}
          </h5>
        </Link>
          <Button asChild size="sm">
            <Link href={`/articles/${article.slug.current}`}>
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
