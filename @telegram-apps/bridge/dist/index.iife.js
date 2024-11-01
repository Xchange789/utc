this.tapps=this.tapps||{};this.tapps.bridge=function(i){"use strict";let v=class $e extends Error{constructor(t,n,r){super(typeof n=="object"?n.message:n||t,{cause:typeof n=="object"?n.cause:r}),this.type=t,Object.setPrototypeOf(this,$e.prototype)}};function Y(e){return e.replace(/[A-Z]/g,t=>`_${t.toLowerCase()}`)}function Ne(e){return e.replace(/_[a-z]/g,t=>t[1].toUpperCase())}const De="ERR_INVALID_VALUE",Ce="ERR_UNEXPECTED_VALUE",Oe="ERR_UNEXPECTED_TYPE",Q="ERR_PARSE";function x(e,t){const n={};for(const r in e){const o=e[r];if(!o)continue;let a,s;typeof o=="function"?(a=r,s=o):[a,s]=o;try{const c=s(t(a));c!==void 0&&(n[r]=c)}catch(c){throw new v(Q,`Parser for "${r}" property failed${a===r?"":`. Source field: "${a}"`}`,c)}}return n}function ee(e){let t=e;if(typeof t=="string")try{t=JSON.parse(t)}catch(n){throw new v(De,{cause:n})}if(typeof t!="object"||!t||Array.isArray(t))throw new v(Ce);return t}function g(e,t){return n=>{const r=o=>{if(!(n&&o===void 0))try{return t(o)}catch(a){throw new v(Q,{message:`"${e}" transformer failed to parse the value`,cause:a})}};return Object.assign(r,{isValid(o){try{return r(o),!0}catch{return!1}}})}}function h(e,t){return g(t||"object",n=>{const r=ee(n);return x(e,o=>r[o])})}function R(e){throw new v(Oe,`Unexpected value received: ${JSON.stringify(e)}`)}const A=g("boolean",e=>{if(typeof e=="boolean")return e;const t=String(e);if(t==="1"||t==="true")return!0;if(t==="0"||t==="false")return!1;R(e)}),l=g("string",e=>{if(typeof e=="string"||typeof e=="number")return e.toString();R(e)}),P=g("number",e=>{if(typeof e=="number")return e;if(typeof e=="string"){const t=Number(e);if(!Number.isNaN(t))return t}R(e)}),Ue=g("date",e=>e instanceof Date?e:new Date(P()(e)*1e3));function te(e,t){return g(t||"searchParams",n=>{typeof n!="string"&&!(n instanceof URLSearchParams)&&R(n);const r=typeof n=="string"?new URLSearchParams(n):n;return x(e,o=>{const a=r.get(o);return a===null?void 0:a})})}function L(e){for(const t in e)e[t]=[Y(t),e[t]];return e}const je=e=>{const t=P(),n=P(!0),r=l(),o=l(!0),a=A(!0),s=h(L({addedToAttachmentMenu:a,allowsWriteToPm:a,firstName:r,id:t,isBot:a,isPremium:a,languageCode:o,lastName:o,photoUrl:o,username:o}),"User")(!0);return te(L({authDate:Ue(),canSendAfter:n,chat:h(L({id:t,type:r,title:r,photoUrl:o,username:o}),"Chat")(!0),chatInstance:o,chatType:o,hash:r,queryId:o,receiver:s,startParam:o,user:s}),"initData")(e)};function ke(e){return/^#[\da-f]{6}$/i.test(e)}function Le(e){return/^#[\da-f]{3}$/i.test(e)}function Me(e){const t=e.replace(/\s/g,"").toLowerCase();if(ke(t))return t;if(Le(t)){let r="#";for(let o=0;o<3;o+=1)r+=t[1+o].repeat(2);return r}const n=t.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/)||t.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);if(!n)throw new Error(`Value "${e}" does not satisfy any of known RGB formats.`);return n.slice(1).reduce((r,o)=>{const a=parseInt(o,10).toString(16);return r+(a.length===1?"0":"")+a},"#")}const We=g("rgb",e=>Me(l()(e))),Ie=g("themeParams",e=>{const t=We(!0);return Object.entries(ee(e)).reduce((n,[r,o])=>(n[Ne(r)]=t(o),n),{})});function ne(e){return JSON.stringify(Object.fromEntries(Object.entries(e).map(([t,n])=>[Y(t),n])))}const qe=e=>{const t=l(),n=l(!0),r=A(!0);return te({botInline:["tgWebAppBotInline",r],initData:["tgWebAppData",je(!0)],initDataRaw:["tgWebAppData",n],platform:["tgWebAppPlatform",t],showSettings:["tgWebAppShowSettings",r],startParam:["tgWebAppStartParam",n],themeParams:["tgWebAppThemeParams",Ie()],version:["tgWebAppVersion",t]},"launchParams")(e)};function He(e){const{initDataRaw:t,startParam:n,showSettings:r,botInline:o}=e,a=new URLSearchParams;return a.set("tgWebAppPlatform",e.platform),a.set("tgWebAppThemeParams",ne(e.themeParams)),a.set("tgWebAppVersion",e.version),t&&a.set("tgWebAppData",t),n&&a.set("tgWebAppStartParam",n),typeof r=="boolean"&&a.set("tgWebAppShowSettings",r?"1":"0"),typeof o=="boolean"&&a.set("tgWebAppBotInline",o?"1":"0"),a.toString()}const re=h({eventType:l(),eventData:e=>e},"miniAppsMessage"),oe=g("fn",e=>{if(typeof e=="function")return e;R(e)});function Fe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}const Je=h({TelegramWebviewProxy:h({postEvent:oe()})()});function M(e){return Je().isValid(e)}function ae(){try{return window.self!==window.top}catch{return!0}}var Be=Object.defineProperty,Ve=(e,t,n)=>t in e?Be(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ie=(e,t,n)=>Ve(e,typeof t!="symbol"?t+"":t,n);class b extends Error{constructor(t,n,r){super(typeof n=="object"?n.message:n||t,{cause:typeof n=="object"?n.cause:r}),this.type=t,Object.setPrototypeOf(this,b.prototype)}}function $(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function N(...e){const t=e.flat(1);return[t.push.bind(t),()=>{t.forEach(n=>{n()})}]}function Ge(e,t){return e instanceof b&&e.type===t}function D(e){return t=>Ge(t,e)}const W="ERR_ABORTED",I="ERR_CANCELED",q="ERR_TIMED_OUT";function H(e){return new b(W,{cause:e})}const Ke=D(q),Ze=D(W),ze=D(I);function se(e,t){return e.reject=t.reject,e}class d extends Promise{constructor(t,n){let r,o;typeof t=="function"?(r=t,o=n):o=t;let a,s;super((c,u)=>{o||(o={});const{abortSignal:f}=o;if(f&&f.aborted)return u(H(f.reason));const[_,w]=N(),m=y=>(...Rt)=>(w(),y(...Rt)),j=new AbortController,{signal:k}=j;s=m(y=>{j.abort(y),u(y)}),a=m(c),f&&_($(f,"abort",()=>{s(H(f.reason))}));const{timeout:X}=o;if(X){const y=setTimeout(()=>{s(new b(q,`Timeout reached: ${X}ms`))},X);_(()=>{clearTimeout(y)})}r&&r(a,s,k)}),ie(this,"reject"),this.reject=s}static withFn(t,n){return new d((r,o,a)=>{try{const s=t(a);return s instanceof Promise?s.then(r,o):r(s)}catch(s){o(s)}},n)}static resolve(t){return new d(n=>{n(t)})}static reject(t){return new d((n,r)=>{r(t)})}cancel(){this.reject(new b(I))}catch(t){return this.then(void 0,t)}finally(t){return se(super.finally(t),this)}then(t,n){return se(super.then(t,n),this)}}function ce(e,t){return e.resolve=t.resolve,e}class T extends d{constructor(t,n){let r,o;typeof t=="function"?(r=t,o=n):o=t;let a;super((s,c,u)=>{a=s,r&&r(s,c,u)},o),ie(this,"resolve"),this.resolve=a}static withFn(t,n){return new T((r,o,a)=>d.withFn(t,{abortSignal:a}).then(r,o),n)}static resolve(t){return new T(n=>{n(t)})}static reject(t){return new T((n,r)=>{r(t)})}catch(t){return this.then(void 0,t)}finally(t){return ce(super.finally(t),this)}then(t,n){return ce(super.then(t,n),this)}}function Xe(e,t){return new d(n=>{setTimeout(n,e)},{abortSignal:t})}function ue(e){return`tapps/${e}`}function fe(e,t){sessionStorage.setItem(ue(e),JSON.stringify(t))}function pe(e){const t=sessionStorage.getItem(ue(e));try{return t?JSON.parse(t):void 0}catch{}}function Ye(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Qe(e){return e.replace(/[A-Z]/g,t=>`_${t.toLowerCase()}`)}function xe(e){return e.replace(/_[a-z]/g,t=>t[1].toUpperCase())}function _e(e,t){t||(t={});const{textColor:n,bgColor:r,shouldLog:o=!0}=t;function a(s,...c){if(!o||typeof o=="function"&&!o())return;const u="font-weight:bold;padding:0 5px;border-radius:5px";console[s](`%c${Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3,timeZone:"UTC"}).format(new Date)}%c / %c${e}`,`${u};background-color: lightblue;color:black`,"",`${u};${n?`color:${n};`:""}${r?`background-color:${r}`:""}`,...c)}return[function(...s){a("log",...s)},function(...s){a("error",...s)}]}function et(e,t){document.documentElement.style.setProperty(e,t)}function tt(e){document.documentElement.style.removeProperty(e)}function nt(e,t){t()}function E(e,t){t||(t={});const n=t.equals||Object.is;let r=[],o=e;const a=f=>{if(!n(o,f)){const _=o;o=f,nt(u,()=>{[...r].forEach(([w,m])=>{w(f,_),m&&c(w,!0)})})}};function s(f){const _=typeof f!="object"?{once:f}:f;return{once:_.once||!1,signal:_.signal||!1}}const c=(f,_)=>{const w=s(_),m=r.findIndex(([j,k])=>j===f&&k.once===w.once&&k.signal===w.signal);m>=0&&r.splice(m,1)},u=Object.assign(function(){return rt(u),o},{destroy(){r=[]},set:a,reset(){a(e)},sub(f,_){return r.push([f,s(_)]),()=>c(f,_)},unsub:c,unsubAll(){r=r.filter(f=>f[1].signal)}});return u}const F=[];function rt(e){F.length&&F[F.length-1].add(e)}const J=E(!1),[B,ot]=_e("Bridge",{bgColor:"#9147ff",textColor:"white",shouldLog:J}),at={clipboard_text_received:h({req_id:l(),data:e=>e===null?e:l(!0)(e)},"clipboard_text_received"),custom_method_invoked:h({req_id:l(),result:e=>e,error:l(!0)},"custom_method_invoked"),popup_closed:g("popup_closed",e=>e?h({button_id:t=>t==null?void 0:l()(t)})()(e):{}),viewport_changed:h({height:P(),width:e=>e==null?window.innerWidth:P()(e),is_state_stable:A(),is_expanded:A()},"viewport_changed")};function it(e){const t=window,[,n]=N($(t,"resize",()=>{e(["viewport_changed",{width:window.innerWidth,height:window.innerHeight,is_state_stable:!0,is_expanded:!0}])}),$(t,"message",r=>{if(r.source!==t.parent)return;let o;try{o=re()(r.data)}catch{return}const{eventType:a,eventData:s}=o,c=at[a];try{const u=c?c()(s):s;B("Event received:",u?{eventType:a,eventData:u}:{eventType:a}),e([a,u])}catch(u){ot([`An error occurred processing the "${a}" event from the Telegram application.`,"Please, file an issue here:","https://github.com/Telegram-Mini-Apps/telegram-apps/issues/new/choose"].join(`
`),o,u)}}));return n}const C=E(),O=E();function le(){return O()||O.set(it(C.set)),C}const S=E({});function be(e){let t=S()[e];return t||(t=E(void 0,{equals(){return!1}}),le().sub(n=>{n&&n[0]===e&&t.set(n[1])}),S.set({...S(),[e]:t})),t}function ge(e,t,n){return be(e).sub(t,n)}const he="ERR_METHOD_UNSUPPORTED",de="ERR_RETRIEVE_LP_FAILED",we="ERR_METHOD_PARAMETER_UNSUPPORTED",me="ERR_UNKNOWN_ENV",Ee="ERR_INVOKE_CUSTOM_METHOD_RESPONSE",V=E("https://web.telegram.org");function G(e,t){B("Posting event:",t?{eventType:e,eventData:t}:{eventType:e});const n=window;if(M(n)){n.TelegramWebviewProxy.postEvent(e,JSON.stringify(t));return}const r=JSON.stringify({eventType:e,eventData:t});if(ae())return n.parent.postMessage(r,V());const{external:o}=n;if(h({notify:oe()})().isValid(o)){o.notify(r);return}throw new b(me)}function K(e,t,n){n||(n={});const{capture:r}=n,[o,a]=N();return new d(s=>{(Array.isArray(t)?t:[t]).forEach(c=>{o(ge(c,u=>{(!r||(Array.isArray(t)?r({event:c,payload:u}):r(u)))&&s(u)}))}),(n.postEvent||G)(e,n.params)},n).finally(a)}function Z(e){return qe()(e)}function ye(e){return Z(e.replace(/^[^?#]*[?#]/,"").replace(/[?#]/g,"&"))}function st(){return ye(window.location.href)}function ct(){const e=performance.getEntriesByType("navigation")[0];if(!e)throw new Error("Unable to get first navigation entry.");return ye(e.name)}const ut="launchParams";function ft(){return Z(pe(ut)||"")}function ve(e){fe("launchParams",He(e))}function Re(e){return e instanceof Error?e.message+(e.cause?`
  ${Re(e.cause)}`:""):JSON.stringify(e)}function Pe(){const e=[];for(const t of[st,ct,ft])try{const n=t();return ve(n),n}catch(n){e.push(n)}throw new b(de,["Unable to retrieve launch parameters from any known source. Perhaps, you have opened your app outside Telegram?","📖 Refer to docs for more information:","https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/environment","Collected errors:",...e.map(t=>`— ${Re(t)}`)].join(`
`))}function pt(e){if(e==="simple")try{return Pe(),!0}catch{return!1}return d.withFn(async()=>{if(M(window))return!0;try{return await K("web_app_request_theme","theme_changed",{timeout:100}),!0}catch{return!1}},e)}function U(e,t){window.dispatchEvent(new MessageEvent("message",{data:JSON.stringify({eventType:e,eventData:t}),source:window.parent}))}function _t(e,t){if(typeof t=="string")try{const{eventType:n}=re()(t);n==="web_app_request_theme"&&U("theme_changed",{theme_params:JSON.parse(ne(e))}),n==="web_app_request_viewport"&&U("viewport_changed",{width:window.innerWidth,height:window.innerHeight,is_state_stable:!0,is_expanded:!0})}catch{}}function lt(e){var r;const t=typeof e=="string"?Z(e):e;ve(t);const n=(r=window.TelegramWebviewProxy)==null?void 0:r.postEvent;window.TelegramWebviewProxy={postEvent(o,a){_t(t.themeParams,JSON.stringify({eventType:o,eventData:a})),n==null||n(o,a)}},B("Environment was mocked by the mockTelegramEnv function")}function bt(){[["TelegramGameProxy_receiveEvent"],["TelegramGameProxy","receiveEvent"],["Telegram","WebView","receiveEvent"]].forEach(e=>{let t=window;e.forEach((n,r,o)=>{if(r===o.length-1){t[n]=U;return}n in t||(t[n]={}),t=t[n]})})}function gt(){["TelegramGameProxy_receiveEvent","TelegramGameProxy","Telegram"].forEach(e=>{delete window[e]})}function ht(e,t,n){be(e).unsub(t,n)}function dt(e,t){return le().sub(e,t)}function wt(e,t){C.unsub(e,t)}function Te(e){return({req_id:t})=>t===e}function Se(e){return e.split(".").map(Number)}function Ae(e,t){const n=Se(e),r=Se(t),o=Math.max(n.length,r.length);for(let a=0;a<o;a+=1){const s=n[a]||0,c=r[a]||0;if(s!==c)return s>c?1:-1}return 0}function p(e,t){return Ae(e,t)<=0}function z(e,t,n){if(typeof n=="string"){if(e==="web_app_open_link"){if(t==="try_instant_view")return p("6.4",n);if(t==="try_browser")return p("7.6",n)}if(e==="web_app_set_header_color"&&t==="color")return p("6.9",n);if(e==="web_app_close"&&t==="return_back")return p("7.6",n);if(e==="web_app_setup_main_button"&&t==="has_shine_effect")return p("7.10",n)}switch(e){case"web_app_open_tg_link":case"web_app_open_invoice":case"web_app_setup_back_button":case"web_app_set_background_color":case"web_app_set_header_color":case"web_app_trigger_haptic_feedback":return p("6.1",t);case"web_app_open_popup":return p("6.2",t);case"web_app_close_scan_qr_popup":case"web_app_open_scan_qr_popup":case"web_app_read_text_from_clipboard":return p("6.4",t);case"web_app_switch_inline_query":return p("6.7",t);case"web_app_invoke_custom_method":case"web_app_request_write_access":case"web_app_request_phone":return p("6.9",t);case"web_app_setup_settings_button":return p("6.10",t);case"web_app_biometry_get_info":case"web_app_biometry_open_settings":case"web_app_biometry_request_access":case"web_app_biometry_request_auth":case"web_app_biometry_update_token":return p("7.2",t);case"web_app_setup_swipe_behavior":return p("7.7",t);case"web_app_share_to_story":return p("7.8",t);case"web_app_setup_secondary_button":case"web_app_set_bottom_bar_color":return p("7.10",t);default:return["iframe_ready","iframe_will_reload","web_app_close","web_app_data_send","web_app_expand","web_app_open_link","web_app_ready","web_app_request_theme","web_app_request_viewport","web_app_setup_main_button","web_app_setup_closing_behavior"].includes(e)}}function mt(e,t){t||(t="strict");const n=typeof t=="function"?t:r=>{const{method:o,version:a}=r;let s,c;if("param"in r?(s=`Parameter "${r.param}" of "${o}" method is unsupported in Mini Apps version ${a}`,c=we):(s=`Method "${o}" is unsupported in Mini Apps version ${a}`,c=he),t==="strict")throw new b(c,s);return console.warn(s)};return(r,o)=>z(r,e)?Fe(o)&&r==="web_app_set_header_color"&&"color"in o&&!z(r,"color",e)?n({version:e,method:r,param:"color"}):G(r,o):n({version:e,method:r})}function Et(e,t,n,r){return K("web_app_invoke_custom_method","custom_method_invoked",{...r||{},params:{method:e,params:t,req_id:n},capture:Te(n)}).then(({result:o,error:a})=>{if(a)throw new b(Ee,a);return o})}function yt(e){e.unsubAll(),e.reset()}function vt(){var e;(e=O())==null||e(),[...Object.values(S()),S,C,O,V,J].forEach(yt)}return i.$debug=J,i.$targetOrigin=V,i.CancelablePromise=d,i.ERR_ABORTED=W,i.ERR_CANCELED=I,i.ERR_CUSTOM_METHOD_ERR_RESPONSE=Ee,i.ERR_METHOD_PARAMETER_UNSUPPORTED=we,i.ERR_METHOD_UNSUPPORTED=he,i.ERR_RETRIEVE_LP_FAILED=de,i.ERR_TIMED_OUT=q,i.ERR_UNKNOWN_ENV=me,i.EnhancedPromise=T,i.TypedError=b,i.addEventListener=$,i.camelToKebab=Ye,i.camelToSnake=Qe,i.captureSameReq=Te,i.compareVersions=Ae,i.createAbortError=H,i.createCbCollector=N,i.createLogger=_e,i.createPostEvent=mt,i.createTypedErrorPredicate=D,i.defineEventHandlers=bt,i.deleteCssVar=tt,i.emitMiniAppsEvent=U,i.getStorageValue=pe,i.hasWebviewProxy=M,i.invokeCustomMethod=Et,i.isAbortError=Ze,i.isCanceledError=ze,i.isIframe=ae,i.isTMA=pt,i.isTimeoutError=Ke,i.mockTelegramEnv=lt,i.off=ht,i.on=ge,i.postEvent=G,i.removeEventHandlers=gt,i.request=K,i.resetPackageState=vt,i.retrieveLaunchParams=Pe,i.setCssVar=et,i.setStorageValue=fe,i.sleep=Xe,i.snakeToCamel=xe,i.subscribe=dt,i.supports=z,i.unsubscribe=wt,Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),i}({});
//# sourceMappingURL=index.iife.js.map