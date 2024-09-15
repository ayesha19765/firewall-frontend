"use client";


import { Position, MarkerType, Node, Edge } from '@xyflow/react';

interface NodeInternals {
  positionAbsolute: { x: number; y: number };
}

interface MeasuredNode {
  measured: { width: number; height: number };
  internals: NodeInternals;
}

interface IntersectionPoint {
  x: number;
  y: number;
}

// Helper function for node intersection point
export function getNodeIntersection(intersectionNode: MeasuredNode, targetNode: MeasuredNode): IntersectionPoint {
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } = intersectionNode.measured;
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNode.measured.width / 2;
  const y1 = targetPosition.y + targetNode.measured.height / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// Helper function to determine edge position
export function getEdgePosition(node: MeasuredNode, intersectionPoint: IntersectionPoint): Position {
  const n = { ...node.internals.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.measured.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.measured.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// Helper function to get edge parameters
export function getEdgeParams(source: MeasuredNode, target: MeasuredNode) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}


// Function to create initial nodes and edges
export function createNodesAndEdges(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  // Admin (Central Node)
  nodes.push({
    id: 'admin',
    data: { label: 'Admin (Central Node)' },
    position: center,
    style: { backgroundColor: '#FFD700', color: '#000' }, // Highlight Admin node
  });

  // Create 8 user nodes and connect them to the admin node
  for (let i = 0; i < 10; i++) {
    const degrees = i * (360 / 10);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    // User firewall nodes
    nodes.push({
      id: `node-${i}`,
      data: { label: `Node ${i}` }, // Each user node
      position: { x, y },
      style: { backgroundColor: '#87CEFA', color: '#fff' }, // Style for nodes
    });

    // Connection (edges) from user nodes to admin node
    edges.push({
      id: `edge-${i}`,
      target: 'admin', // Admin node as target
      source: `node-${i}`, // User node as source
      type: 'floating', // Floating edge type
      markerEnd: {
        type: MarkerType.Arrow, // Arrow marker for direction
      },
      style: { stroke: '#000' }, // Edge styling
    });
  }

  return { nodes, edges };
}
