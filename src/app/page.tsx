"use client";

import { useEffect, useState } from 'react'
import FunctionalBlock, { Block } from './components/FunctionalBlock';
import { caluclate } from './constants/constants';
import { LineProvider } from './components/LineContext';


const Home: React.FC = () => {
  const [functionBlocks, setFunctionBlocks] = useState<Block[]>([
    { id: 1, equation: 'x^2', nextFunction: 2, name: 'Function 1' },
    { id: 2, equation: '2x+4', nextFunction: 4, name: 'Function 2' },
    { id: 3, equation: 'x^2+20', nextFunction: null, name: 'Function 3' },
    { id: 4, equation: 'x-2', nextFunction: 5, name: 'Function 4' },
    { id: 5, equation: 'x/2', nextFunction: 3, name: 'Function 5' },
  ]);
  const [x, setX] = useState<number>(2);
  const [y, setY] = useState<number | undefined>(undefined);

  const getEqnfromChild = (e: string, id: number) => {
    setFunctionBlocks(eq => eq.map(element => {
      if (element.id === id) {
        element.equation = e;
      }
      return element;
    }));
  }

  useEffect(() => {
    let finalOutPut = caluclate(functionBlocks, x);
    setY(finalOutPut);
  })

  return (
    <LineProvider>
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Function Flow Diagram</h1>
        <div className="flex flex-wrap justify-center items-start gap-4">
          <div className="bg-orange-100 p-2 rounded-md">
            <p className="text-sm">Initial value of x</p>
            <input type='number' onChange={e => setX(Number(e.target.value))} value={x} />
            <p className="text-xl font-bold">{x}</p>
          </div>
          {functionBlocks.map((block) => (
            <FunctionalBlock key={block.id} block={block} onDataSend={(e: string) => { getEqnfromChild(e, block.id) }}></FunctionalBlock>
          ))}
          <div className="bg-green-100 p-2 rounded-md">
            <p className="text-sm">Final Output y</p>
            <p className="text-xl font-bold">{y}</p>
          </div>
        </div>
      </div>
    </LineProvider>

  )
};

export default Home;