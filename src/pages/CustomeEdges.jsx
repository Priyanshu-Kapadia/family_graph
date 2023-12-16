import React, { useState } from 'react'
import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow
} from 'reactflow'

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    const { setEdges } = useReactFlow()
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY
    })

    const [relation, setRelation] = useState('')

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                {/* <foreignObject x={labelX - 20} y={labelY - 10} width="40" height="20"> */}
                <div className="mt-4 flex">
                    <div className="mr-2 w-1/2">
                        <input
                            type="text"
                            style={{
                                position: 'absolute',
                                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                                pointerEvents: 'all',
                                width: '50%',
                                textAlign: 'center'
                            }}
                            className="nodrag nopan mt-1 rounded-md border border-black p-2 focus:border-blue-500 focus:outline-none"
                            value={relation}
                            onChange={(e) => setRelation(e.target.value)}
                        />
                    </div>
                </div>
                {/* </foreignObject> */}
            </EdgeLabelRenderer>
        </>
    )
}
