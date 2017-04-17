import { EscherNode } from './EscherNode';

export interface NodeData {
    count: number;

    nodes: EscherNode[]
}

export type NodeDictionary = {
    [nodeType: string]: NodeData
}
