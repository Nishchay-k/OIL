import type { Well, Report, Alert } from '../types';
const formations=['Synthetic Sandstone A','Synthetic Shale B','Synthetic Limestone C','Synthetic Deltaic Sequence D'];
const types=['Lost circulation','Stuck pipe','Kick','NPT','Equipment failure'] as const;
const summaries=['Partial drilling-fluid loss observed while drilling through sandstone.','Elevated torque and drag preceded a stuck-pipe event during trip out.','Flow increase observed during connection; well remained stable after review.','Unplanned circulation and clean-out time recorded in daily operations.','Top-drive vibration required inspection and a short maintenance stop.'];
export const wells:Well[]=Array.from({length:12},(_,i)=>{
 const id=`OIL-SYN-${String(i+1).padStart(3,'0')}`;
 const selected=i===0?0:(i*3+1)%5;
 const from=1780+(i*137)%850;
 const event={id:`EV-${String(i+1).padStart(3,'0')}`,type:types[selected],from,to:from+45+(i%3)*20,date:`2026-${String((i%8)+1).padStart(2,'0')}-${String((i*3%26)+1).padStart(2,'0')}`,severity:(i%5===0?'High':i%3===0?'Medium':'Low') as 'Low'|'Medium'|'High',summary:summaries[selected],report:`RPT-${String(i+1).padStart(3,'0')}`,page:(i%8)+2,confidence: i===10?0.62:0.88+(i%10)/100};
 return {id,name:id,status:i===0?'Active':'Historical',lat:27.45+Math.sin(i*1.9)*.075,lon:95.35+Math.cos(i*1.7)*.09,spud:`202${i%6}-0${(i%9)+1}-12`,totalDepth:2800+(i*173)%1300,currentDepth:i===0?2015:0,formation:formations[i%4],phase:i===0?'Drilling':'Completed',events:[event],};
});
// Ensure the active well is approaching two cited historical lost-circulation intervals.
wells[2].events[0]={...wells[2].events[0],type:'Lost circulation',from:2000,to:2080,summary:'Partial loss of drilling fluid observed in a comparable sandstone interval.',report:'RPT-003',page:4}; wells[2].formation='Synthetic Sandstone A';
wells[5].events[0]={...wells[5].events[0],type:'Lost circulation',from:2025,to:2090,summary:'Returns reduced while drilling through a comparable sandstone interval.',report:'RPT-006',page:6}; wells[5].formation='Synthetic Sandstone A';
wells[1].events[0]={...wells[1].events[0],type:'Stuck pipe',from:1900,to:1960,summary:'High overpull noted during trip out; string freed after circulation.',report:'RPT-002',page:3};
export const reports:Report[]=Array.from({length:24},(_,i)=>{const w=wells[i%12],e=w.events[0];return {id:`RPT-${String(i+1).padStart(3,'0')}`,filename:`${w.name}-DDR-${String(i+1).padStart(3,'0')}.pdf`,wellId:w.id,type:i%3===0?'Daily drilling report':'Mud log report',date:e.date,pages:8+i%12,status:i===20?'Needs review':'Indexed',confidence:i===20?.62:e.confidence,snippet:e.summary};});
export const initialAlerts:Alert[]=[{id:'ALT-001',wellId:'OIL-SYN-001',type:'Lost circulation',severity:'High',current:2015,from:2000,to:2080,sources:['RPT-003','RPT-006'],status:'New',created:'09:42:18'}];
export const telemetry=Array.from({length:24},(_,i)=>({time:`${String(8+Math.floor(i/4)).padStart(2,'0')}:${String((i%4)*15).padStart(2,'0')}`,depth:1680+i*15,rop:28+Math.sin(i/2)*9,weight:18+Math.cos(i/3)*4,torque:12+Math.sin(i/3)*5,pressure:2240+Math.cos(i/4)*180}));
export const auditSeed=[{user:'A. Sharma',role:'Drilling Engineer',action:'Alert generated',entity:'ALT-001 · Lost circulation',time:'09:42:18',status:'System'},{user:'R. Das',role:'eRTMAC Analyst',action:'Search performed',entity:'Lost circulation · 2,000–2,200 m',time:'09:36:04',status:'Complete'},{user:'System',role:'Service',action:'Report indexed',entity:'OIL-SYN-006-DDR-006.pdf',time:'09:31:52',status:'Complete'},{user:'M. Bora',role:'Records Administrator',action:'Extraction flagged',entity:'RPT-021 · Page 5',time:'09:18:27',status:'Review'}];
