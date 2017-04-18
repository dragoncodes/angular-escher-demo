export interface Reaction {
	bigg_id: string;
	reaction_id: string;
	gene_reaction_rule: string;
	reversibility: boolean;
	name: string;

	segments: {
		[segmentId: string]: ReactionSegment;
	};
}

export interface ReactionSegment {
	data?: any;
	b1?: {
		x: number,
		y: number
	};
	b2?: {
		x: number,
		y: number
	};

	from_node_coefficient: number;
	to_node_coefficient: number;

	segment_id: string;

	from_node_id: number;
	to_node_id: number;
	reversibility: boolean;
}
