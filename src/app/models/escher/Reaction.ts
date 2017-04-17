export interface Reaction {
    bigg_id: string;
    reaction_id: string;
    gene_reaction_rule: string;
    
    segments: {
        [segmentId:string]: ReactionSegment;
    }
}

export interface ReactionSegment {
    data?: any;

    from_node_id: number;
    to_node_id: number;
    reversibility: boolean;
}
