export interface EscherNode {
	node_is_primary: boolean;
	name?: string;
	label_x: number;
	label_y: number;
	node_type: string;
	connected_segments: EscherSegment[];
	x: number;
	y: number;
	bigg_id: string;

	data?: any;
	data_string?: any;

	node_id: number;
};

export interface EscherSegment {
	segment_id: number;
	reaction_id: number;
};

export interface EscherNodeDictionary {
	[id: string]: EscherNode;
};
