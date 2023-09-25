'use client';
// import { useMemo } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import Dagre from 'dagre';
import 'reactflow/dist/style.css';
// import { Button } from '@/base/components/ui/button';
// import FetchGraphQL from "@/src/components/"

const edges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    label: 'to the',
    type: 'step',
  },
  {
    id: '1-3',
    source: '1',
    target: '3',
    label: 'to the',
    type: 'step',
  },
];

const nodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'World' },
  },
  {
    id: '3',
    position: { x: 200, y: 200 },
    data: { label: 'Heeyyyyy' },
  },
];

// const g = new Dagre.graphlib.Graph().setDefault

export default function Home() {
  return (
    <div style={{ height: '80vh', width: '80vw', border: '1px solid black' }}>
      <h1>test</h1>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
