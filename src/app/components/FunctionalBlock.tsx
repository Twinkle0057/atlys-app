"use client";

import React, { useEffect, useRef } from "react";
import { useLineContext } from "./LineContext";
const FunctionalBlock: React.FC<ChildProps> = ({ onDataSend, block }) => {
  const startRef = useRef<HTMLDivElement>(null);
  const { setTag1Position } = useLineContext();

  const endRef = useRef<HTMLDivElement>(null);
  const { setTag2Position } = useLineContext();

  const handleSetEquation = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataSend(e.target.value);
  }

  useEffect(() => {
    if (endRef.current) {
      setTag1Position(endRef.current.getBoundingClientRect());
    }
    if (startRef.current) {
      setTag2Position(startRef.current.getBoundingClientRect());
    }
  }, [setTag1Position, setTag2Position]);

  if (!block) {
    return <div>loading</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64">
      <h2 className="text-lg font-semibold mb-2">Function: {block.id}</h2>
      <div className="mb-4">
        <label className="params text-sm font-medium text-gray-700">Equation</label>
        <input
          type="text"
          className="mt-1 params w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={handleSetEquation}
          value={block.equation}
        />
      </div>
      <div>
        <div className="mt-1 relative">
          <label className="block text-sm font-medium text-gray-700">Next function</label>
          <p className="mt-1 text-sm text-gray-600">
            {block.nextFunction ? `Function: ${block.nextFunction}` : '-'}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div ref={endRef} className="w-3 h-3 bg-blue-500 rounded-full" />
        <div ref={startRef} className="w-3 h-3 bg-blue-500 rounded-full" />
      </div>
    </div>
  )
}

export type ChildProps = {
  onDataSend: (data: string) => void;
  block: Block;
}

export type Block = {
  id: number;
  name: string;
  equation: string;
  nextFunction?: number | null;
}

export default FunctionalBlock;