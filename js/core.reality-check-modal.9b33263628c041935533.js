(window.webpackJsonp=window.webpackJsonp||[]).push([["reality-check-modal"],{717:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return A}));var r=a(12),n=a(7),l=a.n(n),i=a(0),c=a(21),o=a(5),s=a(4),u=a(2),m=a(10),b=a(63),p=function(e){var t=e.disableApp,a=e.enableApp,n=e.IntervalField,l=e.is_visible,c=e.logout,m=e.onSubmit,b=e.openStatement,p=e.validateForm;return i.createElement(o.Modal,{className:"reality-check",enableApp:a,is_open:l,disableApp:t,has_close_icon:!1,title:Object(u.localize)("Trading statistics report"),width:"720px"},i.createElement(r.c,{initialValues:{interval:""},validate:p,onSubmit:m},(function(e){var t=e.errors,a=e.isSubmitting,l=e.isValid,m=e.values,p=e.touched,d=e.handleChange,_=e.handleBlur;return i.createElement(r.b,{noValidate:!0},i.createElement(o.Modal.Body,null,i.createElement(o.Div100vhContainer,{className:"reality-check__wrapper",max_autoheight_offset:"204px",is_disabled:Object(s.isDesktop)()},i.createElement("p",{className:"reality-check__text reality-check__text--description"},i.createElement(u.Localize,{i18n_default_text:"Options trading can become a real addiction, as can any other activity pushed to its limits. To avoid the danger of such an addiction, we provide a reality-check that gives you a summary of your trades and accounts on a regular basis."})),i.createElement("p",{className:"reality-check__text reality-check__text--description"},i.createElement(u.Localize,{i18n_default_text:"Would like to check your statement first? <0>Check Statement</0>",components:[i.createElement("a",{key:0,className:"link",onClick:b})]})),i.createElement("div",{className:"reality-check__separator reality-check__separator--large"}),i.createElement("p",{className:"reality-check__text reality-check__text--center"},i.createElement(u.Localize,{i18n_default_text:"Please specify your preferred interval reality check in minutes:"})),i.createElement(n,{values:m,touched:p,errors:t,handleChange:d,handleBlur:_}))),i.createElement(o.Modal.Footer,{has_separator:!0},i.createElement(o.FormSubmitButton,{className:"reality-check__submit",has_cancel:!0,cancel_label:Object(u.localize)("Log out"),is_disabled:!m.interval||!l||a,label:Object(u.localize)("Continue trading"),onCancel:c})))})))};p.propTypes={disableApp:l.a.func,enableApp:l.a.func,IntervalField:l.a.func,is_visible:l.a.bool,logout:l.a.func,onSubmit:l.a.func,openStatement:l.a.func,validateForm:l.a.func};var d=p,_=a(13);function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function y(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],r=!0,n=!1,l=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);r=!0);}catch(e){n=!0,l=e}finally{try{r||null==c.return||c.return()}finally{if(n)throw l}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var g=function(e){var t=e.label,a=e.value;return i.createElement("div",{className:"reality-check__row"},i.createElement("span",null,t),i.createElement("strong",null,a))},E=function(e){var t=e.label,a=e.value;return i.createElement("p",{className:"reality-check__text"},i.createElement("span",null,t),i.createElement("br",null),i.createElement("strong",null,a))},k=function(e){var t=e.disableApp,a=e.enableApp,n=e.IntervalField,l=e.is_visible,c=e.logout,m=e.onSubmit,b=e.openPositions,p=e.openStatement,d=e.reality_check_duration,f=e.server_time,k=e.validateForm,O=v(i.useState({}),2),j=O[0],C=O[1];i.useEffect((function(){var e=performance.now();_.b.realityCheck().then((function(t){var a=t.reality_check;if(a){var r=performance.now()-e,n=f.add(r,"milliseconds");C(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(Object(a),!0).forEach((function(t){y(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({current_date_time_gmt:Object(s.toGMTFormat)(n),duration_string:x(a.start_time,n.unix()),profit:a.sell_amount-a.buy_amount,start_date_time_gmt:Object(s.toGMTFormat)(1e3*+a.start_time),turnover:a.sell_amount+a.buy_amount},a))}}))}),[]);var x=function(e,t){var a=Object(s.getDiffDuration)(e,t);return Object(u.localize)("{{num_day}} days {{num_hour}} hours {{num_minute}} minutes",{num_day:a.get("days"),num_hour:a.get("hours"),num_minute:a.get("minutes")})};return Object(s.isEmptyObject)(j)?i.createElement(o.Loading,null):i.createElement(o.Modal,{className:"reality-check",enableApp:a,is_open:l,disableApp:t,has_close_icon:!1,title:i.createElement(i.Fragment,null,i.createElement(o.DesktopWrapper,null,i.createElement(u.Localize,{i18n_default_text:"Your trading statistics since: {{date_time}}",values:{date_time:j.start_date_time_gmt}})),i.createElement(o.MobileWrapper,null,i.createElement(u.Localize,{i18n_default_text:"Your trading statistics since:"}),i.createElement("br",null),j.start_date_time_gmt)),width:Object(s.isMobile)()?"304px":"720px"},i.createElement(r.c,{initialValues:{interval:d},validate:k,onSubmit:m},(function(e){var t=e.errors,a=e.isSubmitting,l=e.isValid,m=e.values,d=e.touched,_=e.handleChange,h=e.handleBlur;return i.createElement(r.b,{noValidate:!0},i.createElement(o.Modal.Body,null,i.createElement(o.ThemedScrollbars,{height:"75vh",autoHide:!1,is_bypassed:Object(s.isMobile)()},i.createElement(o.Div100vhContainer,{className:"reality-check__column-wrapper",is_disabled:Object(s.isDesktop)(),max_autoheight_offset:"204px"},i.createElement("div",{className:"reality-check__column"},i.createElement("div",{className:"reality-check__column-content"},i.createElement(g,{label:Object(u.localize)("Login ID"),value:j.loginid}),i.createElement(g,{label:Object(u.localize)("Currency"),value:j.currency}),i.createElement(g,{label:Object(u.localize)("Turnover"),value:i.createElement(o.Money,{amount:j.turnover,currency:j.currency})}),i.createElement(g,{label:Object(u.localize)("Profit/loss"),value:i.createElement(i.Fragment,null,!!j.profit&&(j.profit<0?"-":"+"),i.createElement(o.Money,{amount:j.profit,currency:j.currency}))}),i.createElement(g,{label:Object(u.localize)("Contract bought"),value:j.buy_count}),i.createElement(g,{label:Object(u.localize)("Contract sold"),value:j.sell_count}),i.createElement(g,{label:Object(u.localize)("Potential profit"),value:i.createElement(o.Money,{amount:j.potential_profit,currency:j.currency})})),i.createElement(o.Button,{type:"button",secondary:!0,large:!0,onClick:j.open_contract_count?b:p,className:"reality-check__button reality-check__button--full-width"},Object(u.localize)("Go to Reports"))),i.createElement(o.MobileWrapper,null,i.createElement("div",{className:"reality-check__separator"})),i.createElement("div",{className:"reality-check__column"},i.createElement(E,{label:Object(u.localize)("Session duration:"),value:j.duration_string}),i.createElement(E,{label:Object(u.localize)("Login time:"),value:j.start_date_time_gmt}),i.createElement(E,{label:Object(u.localize)("Current time:"),value:j.current_date_time_gmt}),i.createElement(o.DesktopWrapper,null,i.createElement("div",{className:"reality-check__separator"})),i.createElement("p",{className:"reality-check__text reality-check__text--center"},i.createElement(u.Localize,{i18n_default_text:"Your preferred time interval between each report:"})),i.createElement(n,{values:m,touched:d,errors:t,handleChange:_,handleBlur:h}))))),i.createElement(o.Modal.Footer,{has_separator:!0},i.createElement(o.FormSubmitButton,{className:"reality-check__submit",has_cancel:!0,cancel_label:Object(u.localize)("Log out"),is_disabled:!m.interval||!l||a,label:Object(u.localize)("Continue trading"),onCancel:c})))})))};k.propTypes={disableApp:l.a.func,enableApp:l.a.func,IntervalField:l.a.func,is_visible:l.a.bool,logout:l.a.func,onSubmit:l.a.func,openPositions:l.a.func,openStatement:l.a.func,reality_check_duration:l.a.number,server_time:l.a.object,validateForm:l.a.func};var O=k;function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var C=function(e){var t=e.values,a=e.touched,n=e.errors,l=e.handleChange,c=e.handleBlur;return i.createElement("div",{className:"reality-check__fieldset"},i.createElement(r.a,{name:"interval"},(function(e){var r=e.field;return i.createElement(o.Input,j({},r,{"data-lpignore":"true",type:"text",label:Object(u.localize)("Time interval"),value:t.interval,onChange:l,onBlur:c,hint:Object(u.localize)("Interval should be between 10-60 minutes"),required:!0,error:a.interval&&n.interval,autoComplete:"off",maxLength:"2"}))})))},x=function(e){var t=e.disableApp,a=e.enableApp,r=e.logoutClient,n=e.is_visible,l=e.reality_check_dismissed,o=e.reality_check_duration,m=e.server_time,p=e.setRealityCheckDuration,_=e.setReportsTabIndex,h=e.setVisibilityRealityCheck,y=Object(c.useHistory)(),v=function(){_(2),y.push(s.routes.statement),h(0)},f=function(e){var t={};return e.interval?Object(b.b)(e.interval,{type:"number",min:10,max:60})||(t.interval=Object(b.a)().number.message):t.interval=Object(u.localize)("This field is required."),t},g=function(e){h(0),p(e.interval)};return!l&&o?i.createElement(O,{disableApp:t,enableApp:a,is_visible:n,openPositions:function(){_(0),y.push(s.routes.positions),h(0)},openStatement:v,validateForm:f,onSubmit:g,logout:r,reality_check_duration:o,server_time:m,IntervalField:C}):i.createElement(d,{disableApp:t,enableApp:a,is_visible:n,openStatement:v,validateForm:f,onSubmit:g,logout:r,IntervalField:C})};x.propTypes={disableApp:l.a.func,enableApp:l.a.func,history:l.a.object,logoutClient:l.a.func,is_visible:l.a.bool,reality_check_dismissed:l.a.bool,reality_check_duration:l.a.number,setRealityCheckDuration:l.a.func,setReportsTabIndex:l.a.func,setVisibilityRealityCheck:l.a.func};var A=Object(m.b)((function(e){var t=e.client,a=e.common,r=e.ui;return{logoutClient:t.logout,is_visible:t.is_reality_check_visible,reality_check_dismissed:t.reality_check_dismissed,reality_check_duration:t.reality_check_duration,setRealityCheckDuration:t.setRealityCheckDuration,setVisibilityRealityCheck:t.setVisibilityRealityCheck,server_time:a.server_time,enableApp:r.enableApp,disableApp:r.disableApp,setReportsTabIndex:r.setReportsTabIndex}}))(x)}}]);
//# sourceMappingURL=core.reality-check-modal.9b33263628c041935533.js.map