// FloorCallout.jsx
// Lightweight leader line in warm rose terracotta to indicate active selected floor coordinate.

import { Line } from '@react-three/drei';

export default function FloorCallout({ room }) {
  if (!room) return null;

  const start = room.position;
  const end = [
    room.position[0] + 0.35,
    room.position[1] + 0.35,
    room.position[2] + 0.15,
  ];

  return (
    <group>
      <Line
        points={[start, end]}
        color="#d28574"
        lineWidth={2}
        transparent
        opacity={0.85}
      />
    </group>
  );
}
