export type EventType = 'Lost circulation' | 'Stuck pipe' | 'Kick' | 'NPT' | 'Equipment failure' | 'No recorded event';
export type WellEvent = { id:string; type:EventType; from:number; to:number; date:string; severity:'Low'|'Medium'|'High'|'Critical'; summary:string; report:string; page:number; confidence:number };
export type Well = { id:string; name:string; status:'Active'|'Historical'; lat:number; lon:number; spud:string; totalDepth:number; currentDepth:number; formation:string; phase:string; events:WellEvent[]; field?:string; type?:'Producer'|'Injector'|'Exploration'|'Appraisal' };
export type Report = { id:string; filename:string; wellId:string; type:string; date:string; pages:number; status:string; confidence:number; snippet:string };
export type Alert = { id:string; wellId:string; type:EventType; severity:'High'|'Medium'|'Critical'; current:number; from:number; to:number; sources:string[]; status:'New'|'Acknowledged'|'Dismissed'|'Under investigation'; created:string };
