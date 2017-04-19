import { EscherNode, ReactionDictionary } from './';

export interface EscherMetadata {
	homepage: string;
	map_description: string;
	map_id: string;
	map_name: string;
	schema: string;
};


export interface EscherCoreData {
	canvas: Object;
	nodes: { [nodeId: string]: EscherNode };
	reactions: ReactionDictionary;
};
