'use client';
// import { useMemo } from 'react';

import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import Dagre from 'dagre';
import 'reactflow/dist/style.css';
// import { Button } from '@/base/components/ui/button';
// import FetchGraphQL from "@/src/components/"

const initialEdges = [
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

const initialNodes = [
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

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));
  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitview="true"
    >
      <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

export default function Home() {
  return (
    <>
      {/* <h1>test</h1> */}
      <div style={{ height: '80vh', width: '80vw', border: '1px solid black' }}>
        {/* <ReactFlow nodes={nodes} edges={edges}>
          <Background />
          <Controls />
        </ReactFlow> */}
        <ReactFlowProvider>
          <LayoutFlow />
        </ReactFlowProvider>
      </div>
    </>
  );
}
