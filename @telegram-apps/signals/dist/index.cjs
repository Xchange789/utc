"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});let i;function S(n,s){i&&i.set(n,s)||s()}function m(n){if(i)return n();i=new Map;try{n()}finally{i.forEach(s=>s()),i=void 0}}function h(n,s){s||(s={});const d=s.equals||Object.is;let e=[],c=n;const a=t=>{if(!d(c,t)){const u=c;c=t,S(l,()=>{[...e].forEach(([f,g])=>{f(t,u),g&&r(f,!0)})})}};function o(t){const u=typeof t!="object"?{once:t}:t;return{once:u.once||!1,signal:u.signal||!1}}const r=(t,u)=>{const f=o(u),g=e.findIndex(([y,p])=>y===t&&p.once===f.once&&p.signal===f.signal);g>=0&&e.splice(g,1)},l=Object.assign(function(){return j(l),c},{destroy(){e=[]},set:a,reset(){a(n)},sub(t,u){return e.push([t,o(u)]),()=>r(t,u)},unsub:r,unsubAll(){e=e.filter(t=>t[1].signal)}});return l}const b=[];function j(n){b.length&&b[b.length-1].add(n)}function E(n,s){let d=new Set;const e=h(a(),s);function c(){e.set(a())}function a(){d.forEach(l=>l.unsub(c,{signal:!0}));const o=new Set;let r;b.push(o);try{r=n()}finally{b.pop()}return o.forEach(l=>{l.sub(c,{signal:!0})}),d=o,r}return Object.assign(function(){return e()},{destroy:e.destroy,sub:e.sub,unsub:e.unsub,unsubAll:e.unsubAll})}exports.batch=m;exports.computed=E;exports.signal=h;
//# sourceMappingURL=index.cjs.map
