import { wells, reports } from '../data/mockData';
import type { Well } from '../types';
export const authService={login:async(name:string)=>({name:name||'A. Sharma',role:'Drilling Engineer'})};
export const wellService={list:async()=>wells,get:async(id:string)=>wells.find(w=>w.id===id)};
export const searchService={search:async(q:string)=>reports.filter(r=>!q||`${r.filename} ${r.snippet}`.toLowerCase().includes(q.toLowerCase())||/lost|circulation/i.test(q)&&/lost|circulation/i.test(r.snippet)||/stuck/i.test(q)&&/stuck/i.test(r.snippet))};
export const documentService={list:async()=>reports};
export const telemetryService={replay:()=>({format:'WITSML-shaped JSON',points:24})};
export const alertService={acknowledge:(id:string)=>({id,status:'Acknowledged'})};
export const auditService={record:(action:string)=>({action,recordedAt:new Date().toLocaleTimeString()})};
export type NewWellInput = Pick<Well,'name'|'field'|'lat'|'lon'|'type'|'status'> & { id?:string };
export function createMockWellRecord(input:NewWellInput, existing:Well[]):Well {
 const nextId=Math.max(0,...existing.map(w=>Number(w.id.match(/(\d+)$/)?.[1]||0)))+1;
 const id=input.id||`OIL-SYN-${String(nextId).padStart(3,'0')}`;
 return {id,name:input.name.trim(),field:input.field?.trim()||'Upper Assam Basin',type:input.type||'Exploration',status:input.status,lat:input.lat,lon:input.lon,spud:new Date().toISOString().slice(0,10),totalDepth:0,currentDepth:0,formation:'Formation not assigned',phase:input.status==='Active'?'Drilling':'Planned',events:[{id:`EV-${id}`,type:'No recorded event',from:0,to:0,date:new Date().toISOString().slice(0,10),severity:'Low',summary:'No historical event records are attached to this new prototype well.',report:'Not available',page:1,confidence:0}]};
}
export type RankedOffset={well:Well;dist:string;score:number;geo:number;form:number;overlap:number;recent:number};
export function rankOffsets(wells:Well[], active:Well, currentDepth=active.currentDepth):RankedOffset[]{
 return wells.filter(w=>w.id!==active.id).map(w=>{
  const dist=Math.sqrt(Math.pow((w.lat-active.lat)*111,2)+Math.pow((w.lon-active.lon)*94,2));
  const geo=Math.max(35,Math.round(100-dist*3));
  const form=w.formation===active.formation?100:42;
  const event=w.events[0];
  const overlap=event&&event.type!=='No recorded event'&&event.to>=currentDepth-450&&event.from<=currentDepth+450?84:50;
  const recent=76-(Number(w.id.match(/(\d+)$/)?.[1]||0)%5)*5;
  return {well:w,dist:dist.toFixed(1),geo,form,overlap,recent,score:Math.round(geo*.28+form*.35+overlap*.25+recent*.12)};
 }).sort((a,b)=>b.score-a.score);
}
