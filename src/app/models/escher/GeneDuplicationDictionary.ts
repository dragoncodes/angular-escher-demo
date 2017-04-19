import { Gene } from './';

export interface GeneDuplicationObject {
	gene: Gene;
	reactionIds: string[];
};

export interface GeneDuplicationDictionary {
	[geneId: string]: GeneDuplicationObject;
};
