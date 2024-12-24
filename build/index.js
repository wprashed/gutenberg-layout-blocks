(()=>{"use strict";const e=window.wp.element,t=window.wp.blocks,n=window.wp.blockEditor,a=window.wp.components;(0,t.registerBlockType)("gutenberg-layout-blocks/container",{title:"Container",icon:"layout",category:"layout",attributes:{contentWidth:{type:"string",default:"boxed"},width:{type:"number",default:1140},minHeight:{type:"number",default:0},backgroundColor:{type:"string",default:""},backgroundType:{type:"string",default:"classic"},backgroundImage:{type:"string",default:""},backgroundPosition:{type:"string",default:"center center"},backgroundAttachment:{type:"string",default:"scroll"},backgroundRepeat:{type:"string",default:"no-repeat"},backgroundSize:{type:"string",default:"cover"},gradient:{type:"string",default:""},overlayColor:{type:"string",default:""},overlayOpacity:{type:"number",default:.5},padding:{type:"object",default:{top:10,right:10,bottom:10,left:10,unit:"px"}},margin:{type:"object",default:{top:0,right:0,bottom:0,left:0,unit:"px"}},zIndex:{type:"number",default:0}},edit:({attributes:t,setAttributes:l})=>{const[o,i]=(0,e.useState)("layout"),r=(e,n,a)=>{l({[e]:{...t[e],[n]:a}})};return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(n.InspectorControls,null,(0,e.createElement)("div",{className:"gutenberg-layout-blocks-tabs"},(0,e.createElement)("button",{className:"tab "+("layout"===o?"active":""),onClick:()=>i("layout")},"Layout"),(0,e.createElement)("button",{className:"tab "+("style"===o?"active":""),onClick:()=>i("style")},"Style"),(0,e.createElement)("button",{className:"tab "+("advanced"===o?"active":""),onClick:()=>i("advanced")},"Advanced")),"layout"===o&&(0,e.createElement)(a.PanelBody,{title:"Layout",initialOpen:!0},(0,e.createElement)(a.SelectControl,{label:"Content Width",value:t.contentWidth,options:[{label:"Boxed",value:"boxed"},{label:"Full Width",value:"full"}],onChange:e=>l({contentWidth:e})}),"boxed"===t.contentWidth&&(0,e.createElement)(a.RangeControl,{label:"Width",value:t.width,onChange:e=>l({width:e}),min:300,max:2e3}),(0,e.createElement)(a.RangeControl,{label:"Minimum Height",value:t.minHeight,onChange:e=>l({minHeight:e}),min:0,max:1e3})),"style"===o&&(0,e.createElement)(a.PanelBody,{title:"Style",initialOpen:!0},(0,e.createElement)(a.SelectControl,{label:"Background Type",value:t.backgroundType,options:[{label:"Classic",value:"classic"},{label:"Gradient",value:"gradient"}],onChange:e=>l({backgroundType:e})}),"classic"===t.backgroundType&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(n.ColorPalette,{value:t.backgroundColor,onChange:e=>l({backgroundColor:e}),label:"Background Color"}),(0,e.createElement)(n.MediaUploadCheck,null,(0,e.createElement)(n.MediaUpload,{onSelect:e=>l({backgroundImage:e.url}),allowedTypes:["image"],value:t.backgroundImage,render:({open:n})=>(0,e.createElement)(a.Button,{onClick:n,isPrimary:!0},t.backgroundImage?"Change Background Image":"Add Background Image")})),t.backgroundImage&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.SelectControl,{label:"Background Position",value:t.backgroundPosition,options:[{label:"Center Center",value:"center center"},{label:"Center Left",value:"center left"},{label:"Center Right",value:"center right"},{label:"Top Center",value:"top center"},{label:"Top Left",value:"top left"},{label:"Top Right",value:"top right"},{label:"Bottom Center",value:"bottom center"},{label:"Bottom Left",value:"bottom left"},{label:"Bottom Right",value:"bottom right"}],onChange:e=>l({backgroundPosition:e})}),(0,e.createElement)(a.SelectControl,{label:"Background Attachment",value:t.backgroundAttachment,options:[{label:"Scroll",value:"scroll"},{label:"Fixed",value:"fixed"}],onChange:e=>l({backgroundAttachment:e})}),(0,e.createElement)(a.SelectControl,{label:"Background Repeat",value:t.backgroundRepeat,options:[{label:"No Repeat",value:"no-repeat"},{label:"Repeat",value:"repeat"},{label:"Repeat-X",value:"repeat-x"},{label:"Repeat-Y",value:"repeat-y"}],onChange:e=>l({backgroundRepeat:e})}),(0,e.createElement)(a.SelectControl,{label:"Background Size",value:t.backgroundSize,options:[{label:"Cover",value:"cover"},{label:"Contain",value:"contain"},{label:"Auto",value:"auto"}],onChange:e=>l({backgroundSize:e})}))),"gradient"===t.backgroundType&&(0,e.createElement)(a.__experimentalGradientPicker,{value:t.gradient,onChange:e=>l({gradient:e})}),(0,e.createElement)(n.ColorPalette,{value:t.overlayColor,onChange:e=>l({overlayColor:e}),label:"Background Overlay"}),(0,e.createElement)(a.RangeControl,{label:"Overlay Opacity",value:t.overlayOpacity,onChange:e=>l({overlayOpacity:e}),min:0,max:1,step:.1})),"advanced"===o&&(0,e.createElement)(a.PanelBody,{title:"Advanced",initialOpen:!0},(0,e.createElement)("p",null,"Margin"),["top","right","bottom","left"].map((n=>(0,e.createElement)(a.RangeControl,{key:`margin-${n}`,label:n.charAt(0).toUpperCase()+n.slice(1),value:t.margin[n],onChange:e=>r("margin",n,e),min:-100,max:100}))),(0,e.createElement)("p",null,"Padding"),["top","right","bottom","left"].map((n=>(0,e.createElement)(a.RangeControl,{key:`padding-${n}`,label:n.charAt(0).toUpperCase()+n.slice(1),value:t.padding[n],onChange:e=>r("padding",n,e),min:0,max:100}))),(0,e.createElement)(a.RangeControl,{label:"Z-Index",value:t.zIndex,onChange:e=>l({zIndex:e}),min:-999,max:999}))),(0,e.createElement)("div",{className:"gutenberg-layout-blocks-container",style:{backgroundColor:"classic"===t.backgroundType?t.backgroundColor:void 0,backgroundImage:"classic"===t.backgroundType&&t.backgroundImage?`url(${t.backgroundImage})`:"gradient"===t.backgroundType?t.gradient:"none",backgroundPosition:t.backgroundPosition,backgroundAttachment:t.backgroundAttachment,backgroundRepeat:t.backgroundRepeat,backgroundSize:t.backgroundSize,minHeight:t.minHeight?`${t.minHeight}px`:"auto",padding:`${t.padding.top}${t.padding.unit} ${t.padding.right}${t.padding.unit} ${t.padding.bottom}${t.padding.unit} ${t.padding.left}${t.padding.unit}`,margin:`${t.margin.top}${t.margin.unit} ${t.margin.right}${t.margin.unit} ${t.margin.bottom}${t.margin.unit} ${t.margin.left}${t.margin.unit}`,zIndex:t.zIndex,position:"relative"}},t.overlayColor&&(0,e.createElement)("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:t.overlayColor,opacity:t.overlayOpacity}}),(0,e.createElement)("div",{style:{position:"relative",zIndex:1,maxWidth:"boxed"===t.contentWidth?`${t.width}px`:"100%",margin:"0 auto"}},(0,e.createElement)(n.InnerBlocks,{allowedBlocks:["gutenberg-layout-blocks/row"],renderAppender:()=>(0,e.createElement)(n.InnerBlocks.ButtonBlockAppender,null)}))))},save:({attributes:t})=>(0,e.createElement)("div",{className:"gutenberg-layout-blocks-container",style:{backgroundColor:"classic"===t.backgroundType?t.backgroundColor:void 0,backgroundImage:"classic"===t.backgroundType&&t.backgroundImage?`url(${t.backgroundImage})`:"gradient"===t.backgroundType?t.gradient:"none",backgroundPosition:t.backgroundPosition,backgroundAttachment:t.backgroundAttachment,backgroundRepeat:t.backgroundRepeat,backgroundSize:t.backgroundSize,minHeight:t.minHeight?`${t.minHeight}px`:"auto",padding:`${t.padding.top}${t.padding.unit} ${t.padding.right}${t.padding.unit} ${t.padding.bottom}${t.padding.unit} ${t.padding.left}${t.padding.unit}`,margin:`${t.margin.top}${t.margin.unit} ${t.margin.right}${t.margin.unit} ${t.margin.bottom}${t.margin.unit} ${t.margin.left}${t.margin.unit}`,zIndex:t.zIndex,position:"relative"}},t.overlayColor&&(0,e.createElement)("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:t.overlayColor,opacity:t.overlayOpacity}}),(0,e.createElement)("div",{style:{position:"relative",zIndex:1,maxWidth:"boxed"===t.contentWidth?`${t.width}px`:"100%",margin:"0 auto"}},(0,e.createElement)(n.InnerBlocks.Content,null)))});const l=window.wp.data;(0,t.registerBlockType)("gutenberg-layout-blocks/row",{title:"Row",icon:"columns",category:"layout",attributes:{columnGap:{type:"number",default:10},contentPosition:{type:"string",default:"top"},contentWidth:{type:"string",default:"full"},columnCount:{type:"number",default:2},columnWidths:{type:"array",default:[]},backgroundColor:{type:"string",default:""},padding:{type:"object",default:{top:10,right:10,bottom:10,left:10,unit:"px"}},margin:{type:"object",default:{top:0,right:0,bottom:0,left:0,unit:"px"}}},edit:({attributes:o,setAttributes:i,clientId:r})=>{const[c,d]=(0,e.useState)("layout"),u=(0,e.useRef)(null),{replaceInnerBlocks:g}=(0,l.useDispatch)("core/block-editor"),{getBlocks:m}=(0,l.useSelect)((e=>e("core/block-editor")),[]),p=(e,t,n)=>{i({[e]:{...o[e],[t]:n}})};return(0,e.useEffect)((()=>{const e=u.current;if(!e)return;const t=document.createElement("div");t.className="column-resizer",t.style.cssText="width: 5px; background: #007cba; cursor: col-resize; position: absolute; top: 0; bottom: 0; right: -2.5px; opacity: 0; transition: opacity 0.3s;";const n=e.querySelectorAll(".wp-block-gutenberg-layout-blocks-column");n.forEach(((a,l)=>{if(l<n.length-1){const n=t.cloneNode();let r,c;a.style.position="relative",a.appendChild(n);const d=t=>{const n=t.pageX-r,a=c.map(((t,a)=>a===l?t+n/e.offsetWidth*100:a===l+1?t-n/e.offsetWidth*100:t));a[l]>10&&a[l+1]>10&&i({columnWidths:a})},u=()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",u),n.style.opacity="0"};n.addEventListener("mousedown",(e=>{r=e.pageX,c=[...o.columnWidths],window.addEventListener("mousemove",d),window.addEventListener("mouseup",u),n.style.opacity="1"})),a.addEventListener("mouseover",(()=>{n.style.opacity="0.5"})),a.addEventListener("mouseout",(()=>{n.matches(":active")||(n.style.opacity="0")}))}}))}),[o.columnWidths]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)(n.InspectorControls,null,(0,e.createElement)("div",{className:"gutenberg-layout-blocks-tabs"},(0,e.createElement)("button",{className:"tab "+("layout"===c?"active":""),onClick:()=>d("layout")},"Layout"),(0,e.createElement)("button",{className:"tab "+("style"===c?"active":""),onClick:()=>d("style")},"Style"),(0,e.createElement)("button",{className:"tab "+("advanced"===c?"active":""),onClick:()=>d("advanced")},"Advanced")),"layout"===c&&(0,e.createElement)(a.PanelBody,{title:"Layout",initialOpen:!0},(0,e.createElement)(a.RangeControl,{label:"Column Gap",value:o.columnGap,onChange:e=>i({columnGap:e}),min:0,max:100}),(0,e.createElement)(a.SelectControl,{label:"Content Position",value:o.contentPosition,options:[{label:"Top",value:"top"},{label:"Middle",value:"middle"},{label:"Bottom",value:"bottom"}],onChange:e=>i({contentPosition:e})}),(0,e.createElement)(a.SelectControl,{label:"Content Width",value:o.contentWidth,options:[{label:"Full Width",value:"full"},{label:"Boxed",value:"boxed"}],onChange:e=>i({contentWidth:e})}),(0,e.createElement)(a.RangeControl,{label:"Column Count",value:o.columnCount,onChange:e=>{const n=m(r),a=Array(e).fill(100/e),l=Array(e).fill().map(((e,l)=>n[l]?{...n[l],attributes:{...n[l].attributes,width:a[l]}}:(0,t.createBlock)("gutenberg-layout-blocks/column",{width:a[l]})));g(r,l,!1),i({columnCount:e,columnWidths:a})},min:1,max:6})),"style"===c&&(0,e.createElement)(a.PanelBody,{title:"Style",initialOpen:!0},(0,e.createElement)(n.ColorPalette,{value:o.backgroundColor,onChange:e=>i({backgroundColor:e}),label:"Background Color"})),"advanced"===c&&(0,e.createElement)(a.PanelBody,{title:"Advanced",initialOpen:!0},(0,e.createElement)("p",null,"Margin"),["top","right","bottom","left"].map((t=>(0,e.createElement)(a.RangeControl,{key:`margin-${t}`,label:t.charAt(0).toUpperCase()+t.slice(1),value:o.margin[t],onChange:e=>p("margin",t,e),min:-100,max:100}))),(0,e.createElement)("p",null,"Padding"),["top","right","bottom","left"].map((t=>(0,e.createElement)(a.RangeControl,{key:`padding-${t}`,label:t.charAt(0).toUpperCase()+t.slice(1),value:o.padding[t],onChange:e=>p("padding",t,e),min:0,max:100}))))),(0,e.createElement)("div",{ref:u,className:"gutenberg-layout-blocks-row",style:{backgroundColor:o.backgroundColor,padding:`${o.padding.top}${o.padding.unit} ${o.padding.right}${o.padding.unit} ${o.padding.bottom}${o.padding.unit} ${o.padding.left}${o.padding.unit}`,margin:`${o.margin.top}${o.margin.unit} ${o.margin.right}${o.margin.unit} ${o.margin.bottom}${o.margin.unit} ${o.margin.left}${o.margin.unit}`}},(0,e.createElement)("div",{style:{display:"flex",flexWrap:"wrap",gap:`${o.columnGap}px`,alignItems:"top"===o.contentPosition?"flex-start":"middle"===o.contentPosition?"center":"flex-end",maxWidth:"boxed"===o.contentWidth?"1140px":"100%",margin:"0 auto"}},(0,e.createElement)(n.InnerBlocks,{allowedBlocks:["gutenberg-layout-blocks/column"],orientation:"horizontal",renderAppender:()=>(0,e.createElement)(n.InnerBlocks.ButtonBlockAppender,null)}))))},save:({attributes:t})=>(0,e.createElement)("div",{className:"gutenberg-layout-blocks-row",style:{backgroundColor:t.backgroundColor,padding:`${t.padding.top}${t.padding.unit} ${t.padding.right}${t.padding.unit} ${t.padding.bottom}${t.padding.unit} ${t.padding.left}${t.padding.unit}`,margin:`${t.margin.top}${t.margin.unit} ${t.margin.right}${t.margin.unit} ${t.margin.bottom}${t.margin.unit} ${t.margin.left}${t.margin.unit}`}},(0,e.createElement)("div",{style:{display:"flex",flexWrap:"wrap",gap:`${t.columnGap}px`,alignItems:"top"===t.contentPosition?"flex-start":"middle"===t.contentPosition?"center":"flex-end",maxWidth:"boxed"===t.contentWidth?"1140px":"100%",margin:"0 auto"}},(0,e.createElement)(n.InnerBlocks.Content,null)))}),(0,t.registerBlockType)("gutenberg-layout-blocks/column",{title:"Column",icon:"columns",category:"layout",attributes:{width:{type:"number",default:100},backgroundColor:{type:"string",default:""},padding:{type:"object",default:{top:10,right:10,bottom:10,left:10,unit:"px"}},margin:{type:"object",default:{top:0,right:0,bottom:0,left:0,unit:"px"}},verticalAlignment:{type:"string",default:"top"}},edit:({attributes:o,setAttributes:i,clientId:r})=>{const[c,d]=(0,e.useState)("layout"),{duplicateBlocks:u}=(0,l.useDispatch)("core/block-editor"),{getBlockRootClientId:g,getBlocks:m}=(0,l.useSelect)((e=>e("core/block-editor")),[]),p=(e,t,n)=>{i({[e]:{...o[e],[t]:n}})};return constduplicateColumn=()=>{const e=g(r),n=m(e),a=n.findIndex((e=>e.clientId===r));(0,t.cloneBlock)(r).clientId,u([r]);const l=100/(n.length+1);n.forEach(((e,t)=>{t!==a&&t!==a+1||(e.attributes.width=l)}))},(0,e.createElement)(e.Fragment,null,(0,e.createElement)(n.InspectorControls,null,(0,e.createElement)("div",{className:"gutenberg-layout-blocks-tabs"},(0,e.createElement)("button",{className:"tab "+("layout"===c?"active":""),onClick:()=>d("layout")},"Layout"),(0,e.createElement)("button",{className:"tab "+("style"===c?"active":""),onClick:()=>d("style")},"Style"),(0,e.createElement)("button",{className:"tab "+("advanced"===c?"active":""),onClick:()=>d("advanced")},"Advanced")),"layout"===c&&(0,e.createElement)(a.PanelBody,{title:"Layout",initialOpen:!0},(0,e.createElement)(a.RangeControl,{label:"Width (%)",value:o.width,onChange:e=>i({width:e}),min:0,max:100}),(0,e.createElement)(a.SelectControl,{label:"Vertical Alignment",value:o.verticalAlignment,options:[{label:"Top",value:"top"},{label:"Middle",value:"middle"},{label:"Bottom",value:"bottom"}],onChange:e=>i({verticalAlignment:e})}),(0,e.createElement)(a.Button,{isPrimary:!0,onClick:duplicateColumn},"Duplicate Column")),"style"===c&&(0,e.createElement)(a.PanelBody,{title:"Style",initialOpen:!0},(0,e.createElement)(n.ColorPalette,{value:o.backgroundColor,onChange:e=>i({backgroundColor:e}),label:"Background Color"})),"advanced"===c&&(0,e.createElement)(a.PanelBody,{title:"Advanced",initialOpen:!0},(0,e.createElement)("p",null,"Margin"),["top","right","bottom","left"].map((t=>(0,e.createElement)(a.RangeControl,{key:`margin-${t}`,label:t.charAt(0).toUpperCase()+t.slice(1),value:o.margin[t],onChange:e=>p("margin",t,e),min:-100,max:100}))),(0,e.createElement)("p",null,"Padding"),["top","right","bottom","left"].map((t=>(0,e.createElement)(a.RangeControl,{key:`padding-${t}`,label:t.charAt(0).toUpperCase()+t.slice(1),value:o.padding[t],onChange:e=>p("padding",t,e),min:0,max:100}))))),(0,e.createElement)("div",{className:"gutenberg-layout-blocks-column",style:{width:`${o.width}%`,backgroundColor:o.backgroundColor,padding:`${o.padding.top}${o.padding.unit} ${o.padding.right}${o.padding.unit} ${o.padding.bottom}${o.padding.unit} ${o.padding.left}${o.padding.unit}`,margin:`${o.margin.top}${o.margin.unit} ${o.margin.right}${o.margin.unit} ${o.margin.bottom}${o.margin.unit} ${o.margin.left}${o.margin.unit}`,display:"flex",flexDirection:"column",justifyContent:"top"===o.verticalAlignment?"flex-start":"middle"===o.verticalAlignment?"center":"flex-end"}},(0,e.createElement)(n.InnerBlocks,null)))},save:({attributes:t})=>(0,e.createElement)("div",{className:"gutenberg-layout-blocks-column",style:{width:`${t.width}%`,backgroundColor:t.backgroundColor,padding:`${t.padding.top}${t.padding.unit} ${t.padding.right}${t.padding.unit} ${t.padding.bottom}${t.padding.unit} ${t.padding.left}${t.padding.unit}`,margin:`${t.margin.top}${t.margin.unit} ${t.margin.right}${t.margin.unit} ${t.margin.bottom}${t.margin.unit} ${t.margin.left}${t.margin.unit}`,display:"flex",flexDirection:"column",justifyContent:"top"===t.verticalAlignment?"flex-start":"middle"===t.verticalAlignment?"center":"flex-end"}},(0,e.createElement)(n.InnerBlocks.Content,null))})})();