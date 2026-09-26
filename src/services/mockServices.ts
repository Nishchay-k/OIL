import { wells, reports } from '../data/mockData';
export const authService={login:async(name:string)=>({name:name||'A. Sharma',role:'Drilling Engineer'})};
export const wellService={list:async()=>wells,get:async(id:string)=>wells.find(w=>w.id===id)};
export const searchService={search:async(q:string)=>reports.filter(r=>!q||`${r.filename} ${r.snippet}`.toLowerCase().includes(q.toLowerCase())||/lost|circulation/i.test(q)&&/lost|circulation/i.test(r.snippet)||/stuck/i.test(q)&&/stuck/i.test(r.snippet))};
export const documentService={list:async()=>reports};
export const telemetryService={replay:()=>({format:'WITSML-shaped JSON',points:24})};
export const alertService={acknowledge:(id:string)=>({id,status:'Acknowledged'})};
export const auditService={record:(action:string)=>({action,recordedAt:new Date().toLocaleTimeString()})};
