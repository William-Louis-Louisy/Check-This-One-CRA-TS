import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import React from "react";
import { typeToIcon } from "../../utils/TypeToIcon";
import ContentCard from "../Cards/ContentCard";
import Slider from "../Common/Slider";

function ListDisplay({ list, lang }) {
  console.log(list);

  return (
    <div className="mx-4 flex w-full flex-col rounded-md bg-myWhite pl-3 pr-3 pb-3 pt-6 shadow-md">
      <div className="mx-6 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <div>{typeToIcon(list.type)}</div>
          <h4 className="text-base text-primary">{list.title}</h4>
        </div>
        <span className="relative z-0 inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <TrashIcon className="h-5 w-5 text-red-600" />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <PencilAltIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <HeartIcon className="text-myRed h-5 w-5" />
          </button>
        </span>
      </div>
      <p className="my-4 ml-8 text-sm italic text-myBlack">
        "{list.description}"
      </p>
      <Slider
        content={list.content.map((c: any, index: number) => (
          <ContentCard key={`card-${index}`} data={c} />
        ))}
        sliderId={list.id}
        leftButton={<ChevronLeftIcon className="h-8" />}
        rightButton={<ChevronRightIcon className="h-8" />}
        leftStepValue={200}
        rightStepValue={200}
      />
    </div>
  );
}

export default ListDisplay;
