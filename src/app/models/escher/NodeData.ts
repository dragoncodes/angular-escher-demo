import { EscherNode } from './';

export interface NodeData {
	count: number;

	nodes: EscherNode[];
}

export interface NodeDictionary {
	[nodeType: string]: NodeData;
};
