(()=>{"use strict";const e=window.wp.element,t=window.wp.blocks,a=window.wp.blockEditor,l=window.wp.components;(0,t.registerBlockType)("gutenberg-layout-blocks/container",{title:"Enhanced Container",icon:"layout",category:"layout",attributes:{backgroundColor:{type:"string",default:""},backgroundType:{type:"string",default:"color"},gradientColor1:{type:"string",default:""},gradientColor2:{type:"string",default:""},gradientDirection:{type:"number",default:90},backgroundImage:{type:"string",default:""},backgroundPosition:{type:"string",default:"center center"},backgroundRepeat:{type:"string",default:"no-repeat"},backgroundSize:{type:"string",default:"cover"},backgroundVideo:{type:"string",default:""},backgroundVideoUrl:{type:"string",default:""},heightType:{type:"string",default:"auto"},heightValue:{type:"number",default:0},heightUnit:{type:"string",default:"px"},minHeightValue:{type:"number",default:0},minHeightUnit:{type:"string",default:"px"},addShape:{type:"boolean",default:!1},shapeType:{type:"string",default:"wave"},shapeColor:{type:"string",default:"#000000"}},edit:({attributes:t,setAttributes:n})=>{const[o,r]=(0,e.useState)("background"),i=e=>{n({backgroundImage:e.url})},c=e=>{n({backgroundVideo:e.url})};return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.InspectorControls,null,(0,e.createElement)("div",{className:"gutenberg-layout-blocks-tabs"},(0,e.createElement)("button",{className:"tab "+("background"===o?"active":""),onClick:()=>r("background")},"Background"),(0,e.createElement)("button",{className:"tab "+("height"===o?"active":""),onClick:()=>r("height")},"Height"),(0,e.createElement)("button",{className:"tab "+("shape"===o?"active":""),onClick:()=>r("shape")},"Shape Divider")),"background"===o&&(0,e.createElement)(l.PanelBody,{title:"Background Settings",initialOpen:!0},(0,e.createElement)(l.RadioControl,{label:"Background Type",selected:t.backgroundType,options:[{label:"Color",value:"color"},{label:"Gradient",value:"gradient"},{label:"Image",value:"image"},{label:"Video",value:"video"}],onChange:e=>n({backgroundType:e})}),(()=>{switch(t.backgroundType){case"color":return(0,e.createElement)(a.ColorPalette,{value:t.backgroundColor,onChange:e=>n({backgroundColor:e})});case"gradient":return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.ColorPalette,{value:t.gradientColor1,onChange:e=>n({gradientColor1:e}),label:"Color 1"}),(0,e.createElement)(a.ColorPalette,{value:t.gradientColor2,onChange:e=>n({gradientColor2:e}),label:"Color 2"}),(0,e.createElement)(l.RangeControl,{label:"Gradient Direction",value:t.gradientDirection,onChange:e=>n({gradientDirection:e}),min:0,max:360}));case"image":return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.MediaUploadCheck,null,(0,e.createElement)(a.MediaUpload,{onSelect:i,allowedTypes:["image"],value:t.backgroundImage,render:({open:a})=>(0,e.createElement)(l.Button,{onClick:a,isPrimary:!0},t.backgroundImage?"Change Background Image":"Add Background Image")})),t.backgroundImage&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.SelectControl,{label:"Background Position",value:t.backgroundPosition,options:[{label:"Center Center",value:"center center"},{label:"Center Top",value:"center top"},{label:"Center Bottom",value:"center bottom"},{label:"Left Center",value:"left center"},{label:"Left Top",value:"left top"},{label:"Left Bottom",value:"left bottom"},{label:"Right Center",value:"right center"},{label:"Right Top",value:"right top"},{label:"Right Bottom",value:"right bottom"}],onChange:e=>n({backgroundPosition:e})}),(0,e.createElement)(l.SelectControl,{label:"Background Repeat",value:t.backgroundRepeat,options:[{label:"No Repeat",value:"no-repeat"},{label:"Repeat",value:"repeat"},{label:"Repeat X",value:"repeat-x"},{label:"Repeat Y",value:"repeat-y"}],onChange:e=>n({backgroundRepeat:e})}),(0,e.createElement)(l.SelectControl,{label:"Background Size",value:t.backgroundSize,options:[{label:"Cover",value:"cover"},{label:"Contain",value:"contain"},{label:"Auto",value:"auto"}],onChange:e=>n({backgroundSize:e})})));case"video":return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.MediaUploadCheck,null,(0,e.createElement)(a.MediaUpload,{onSelect:c,allowedTypes:["video"],value:t.backgroundVideo,render:({open:a})=>(0,e.createElement)(l.Button,{onClick:a,isPrimary:!0},t.backgroundVideo?"Change Background Video":"Add Background Video")})),(0,e.createElement)(l.TextControl,{label:"Video URL",value:t.backgroundVideoUrl,onChange:e=>n({backgroundVideoUrl:e}),help:"Enter a URL for an external video"}))}})()),"height"===o&&(0,e.createElement)(l.PanelBody,{title:"Height Settings",initialOpen:!0},(0,e.createElement)(l.RadioControl,{label:"Height Type",selected:t.heightType,options:[{label:"Auto",value:"auto"},{label:"Fixed",value:"fixed"},{label:"Min Height",value:"min"}],onChange:e=>n({heightType:e})}),"auto"!==t.heightType&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.RangeControl,{label:"fixed"===t.heightType?"Height":"Min Height",value:"fixed"===t.heightType?t.heightValue:t.minHeightValue,onChange:e=>n("fixed"===t.heightType?{heightValue:e}:{minHeightValue:e}),min:0,max:1e3}),(0,e.createElement)(l.SelectControl,{label:"Unit",value:"fixed"===t.heightType?t.heightUnit:t.minHeightUnit,options:[{label:"px",value:"px"},{label:"vh",value:"vh"}],onChange:e=>n("fixed"===t.heightType?{heightUnit:e}:{minHeightUnit:e})}))),"shape"===o&&(0,e.createElement)(l.PanelBody,{title:"Shape Divider Settings",initialOpen:!0},(0,e.createElement)(l.ToggleControl,{label:"Add Shape Divider",checked:t.addShape,onChange:e=>n({addShape:e})}),t.addShape&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(l.SelectControl,{label:"Shape Type",value:t.shapeType,options:[{label:"Wave",value:"wave"},{label:"Triangle",value:"triangle"},{label:"Curve",value:"curve"}],onChange:e=>n({shapeType:e})}),(0,e.createElement)(a.ColorPalette,{value:t.shapeColor,onChange:e=>n({shapeColor:e}),label:"Shape Color"})))),(0,e.createElement)("div",{className:"gutenberg-layout-blocks-container",style:{...(()=>{switch(t.backgroundType){case"color":return{backgroundColor:t.backgroundColor};case"gradient":return{background:`linear-gradient(${t.gradientDirection}deg, ${t.gradientColor1}, ${t.gradientColor2})`};case"image":return{backgroundImage:`url(${t.backgroundImage})`,backgroundPosition:t.backgroundPosition,backgroundRepeat:t.backgroundRepeat,backgroundSize:t.backgroundSize};default:return{}}})(),...(()=>{switch(t.heightType){case"fixed":return{height:`${t.heightValue}${t.heightUnit}`};case"min":return{minHeight:`${t.minHeightValue}${t.minHeightUnit}`};default:return{}}})()}},"video"===t.backgroundType&&(t.backgroundVideo||t.backgroundVideoUrl)&&(0,e.createElement)("video",{autoPlay:!0,muted:!0,loop:!0,className:"background-video"},(0,e.createElement)("source",{src:t.backgroundVideo||t.backgroundVideoUrl,type:"video/mp4"})),t.addShape&&(0,e.createElement)("div",{className:"shape-divider",style:{color:t.shapeColor}},"wave"===t.shapeType&&(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"},(0,e.createElement)("path",{fill:"currentColor",fillOpacity:"1",d:"M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"})),"triangle"===t.shapeType&&(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"},(0,e.createElement)("path",{fill:"currentColor",fillOpacity:"1",d:"M0,320L1440,0L1440,320L0,320Z"})),"curve"===t.shapeType&&(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"},(0,e.createElement)("path",{fill:"currentColor",fillOpacity:"1",d:"M0,224L1440,32L1440,320L0,320Z"}))),(0,e.createElement)(a.InnerBlocks,{allowedBlocks:["gutenberg-layout-blocks/row"]})))},save:({attributes:t})=>(0,e.createElement)("div",{className:"gutenberg-layout-blocks-container",style:{...(()=>{switch(t.backgroundType){case"color":return{backgroundColor:t.backgroundColor};case"gradient":return{background:`linear-gradient(${t.gradientDirection}deg, ${t.gradientColor1}, ${t.gradientColor2})`};case"image":return{backgroundImage:`url(${t.backgroundImage})`,backgroundPosition:t.backgroundPosition,backgroundRepeat:t.backgroundRepeat,backgroundSize:t.backgroundSize};default:return{}}})(),...(()=>{switch(t.heightType){case"fixed":return{height:`${t.heightValue}${t.heightUnit}`};case"min":return{minHeight:`${t.minHeightValue}${t.minHeightUnit}`};default:return{}}})()}},"video"===t.backgroundType&&(t.backgroundVideo||t.backgroundVideoUrl)&&(0,e.createElement)("video",{autoPlay:!0,muted:!0,loop:!0,className:"background-video"},(0,e.createElement)("source",{src:t.backgroundVideo||t.backgroundVideoUrl,type:"video/mp4"})),t.addShape&&(0,e.createElement)("div",{className:"shape-divider",style:{color:t.shapeColor}},"wave"===t.shapeType&&(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"},(0,e.createElement)("path",{fill:"currentColor",fillOpacity:"1",d:"M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"})),"triangle"===t.shapeType&&(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"},(0,e.createElement)("path",{fill:"currentColor",fillOpacity:"1",d:"M0,320L1440,0L1440,320L0,320Z"})),"curve"===t.shapeType&&(0,e.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320"},(0,e.createElement)("path",{fill:"currentColor",fillOpacity:"1",d:"M0,224L1440,32L1440,320L0,320Z"}))),(0,e.createElement)(a.InnerBlocks.Content,null))}),(0,t.registerBlockType)("gutenberg-layout-blocks/row",{title:"Enhanced Row",icon:"columns",category:"layout",attributes:{gutterSize:{type:"number",default:16},verticalAlignment:{type:"string",default:"top"},columnLayout:{type:"string",default:"equal"},backgroundColor:{type:"string",default:""},padding:{type:"object",default:{top:0,right:0,bottom:0,left:0}},margin:{type:"object",default:{top:0,right:0,bottom:0,left:0}}},edit:({attributes:t,setAttributes:n})=>{const[o,r]=(0,e.useState)("layout"),i=(0,e.useRef)(null);(0,e.useEffect)((()=>{const e=i.current;if(!e)return;const t=document.createElement("div");t.className="column-resizer",t.style.cssText="width: 5px; background: #ccc; cursor: col-resize; position: absolute; top: 0; bottom: 0; right: -2.5px;";const a=e.querySelectorAll(".wp-block-gutenberg-layout-blocks-column");a.forEach(((e,l)=>{if(l<a.length-1){const a=t.cloneNode();let l,n,o;e.style.position="relative",e.appendChild(a);const r=t=>{const a=t.pageX-l,r=n+a,i=o-a;r>0&&i>0&&(e.style.width=`${r}px`,e.nextElementSibling.style.width=`${i}px`)},i=()=>{window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",i)};a.addEventListener("mousedown",(t=>{l=t.pageX,n=e.offsetWidth,o=e.nextElementSibling.offsetWidth,window.addEventListener("mousemove",r),window.addEventListener("mouseup",i)}))}}))}),[]);const c=(e,a,l)=>{n({[e]:{...t[e],[a]:l}})};return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.InspectorControls,null,(0,e.createElement)("div",{className:"gutenberg-layout-blocks-tabs"},(0,e.createElement)("button",{className:"tab "+("layout"===o?"active":""),onClick:()=>r("layout")},"Layout"),(0,e.createElement)("button",{className:"tab "+("style"===o?"active":""),onClick:()=>r("style")},"Style"),(0,e.createElement)("button",{className:"tab "+("spacing"===o?"active":""),onClick:()=>r("spacing")},"Spacing")),"layout"===o&&(0,e.createElement)(l.PanelBody,{title:"Layout Settings",initialOpen:!0},(0,e.createElement)(l.RangeControl,{label:"Gutter Size",value:t.gutterSize,onChange:e=>n({gutterSize:e}),min:0,max:50}),(0,e.createElement)(l.SelectControl,{label:"Vertical Alignment",value:t.verticalAlignment,options:[{label:"Top",value:"top"},{label:"Center",value:"center"},{label:"Bottom",value:"bottom"}],onChange:e=>n({verticalAlignment:e})}),(0,e.createElement)(l.SelectControl,{label:"Column Layout",value:t.columnLayout,options:[{label:"Equal Width",value:"equal"},{label:"Custom",value:"custom"}],onChange:e=>n({columnLayout:e})})),"style"===o&&(0,e.createElement)(l.PanelBody,{title:"Style Settings",initialOpen:!0},(0,e.createElement)(a.ColorPalette,{value:t.backgroundColor,onChange:e=>n({backgroundColor:e}),label:"Background Color"})),"spacing"===o&&(0,e.createElement)(l.PanelBody,{title:"Spacing Settings",initialOpen:!0},(0,e.createElement)("p",null,"Padding"),["top","right","bottom","left"].map((a=>(0,e.createElement)(l.RangeControl,{key:`padding-${a}`,label:a.charAt(0).toUpperCase()+a.slice(1),value:t.padding[a],onChange:e=>c("padding",a,e),min:0,max:100}))),(0,e.createElement)("p",null,"Margin"),["top","right","bottom","left"].map((a=>(0,e.createElement)(l.RangeControl,{key:`margin-${a}`,label:a.charAt(0).toUpperCase()+a.slice(1),value:t.margin[a],onChange:e=>c("margin",a,e),min:0,max:100}))))),(0,e.createElement)("div",{ref:i,className:`gutenberg-layout-blocks-row align-${t.verticalAlignment}`,style:{display:"flex",gap:`${t.gutterSize}px`,backgroundColor:t.backgroundColor,padding:`${t.padding.top}px ${t.padding.right}px ${t.padding.bottom}px ${t.padding.left}px`,margin:`${t.margin.top}px ${t.margin.right}px ${t.margin.bottom}px ${t.margin.left}px`}},(0,e.createElement)(a.InnerBlocks,{allowedBlocks:["gutenberg-layout-blocks/column"],orientation:"horizontal",renderAppender:()=>(0,e.createElement)(l.Button,{isPrimary:!0,onClick:()=>{}},"Add Column")})))},save:({attributes:t})=>(0,e.createElement)("div",{className:`gutenberg-layout-blocks-row align-${t.verticalAlignment}`,style:{display:"flex",gap:`${t.gutterSize}px`,backgroundColor:t.backgroundColor,padding:`${t.padding.top}px ${t.padding.right}px ${t.padding.bottom}px ${t.padding.left}px`,margin:`${t.margin.top}px ${t.margin.right}px ${t.margin.bottom}px ${t.margin.left}px`}},(0,e.createElement)(a.InnerBlocks.Content,null))}),(0,t.registerBlockType)("gutenberg-layout-blocks/column",{title:"Enhanced Column",icon:"columns",category:"layout",attributes:{width:{type:"number",default:100},contentAlignment:{type:"string",default:"left"},verticalAlignment:{type:"string",default:"top"},backgroundColor:{type:"string",default:""},padding:{type:"object",default:{top:0,right:0,bottom:0,left:0}},margin:{type:"object",default:{top:0,right:0,bottom:0,left:0}},borderWidth:{type:"number",default:0},borderColor:{type:"string",default:""},borderRadius:{type:"number",default:0}},edit:({attributes:t,setAttributes:n})=>{const[o,r]=(0,e.useState)("layout"),i=(e,a,l)=>{n({[e]:{...t[e],[a]:l}})};return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.InspectorControls,null,(0,e.createElement)("div",{className:"gutenberg-layout-blocks-tabs"},(0,e.createElement)("button",{className:"tab "+("layout"===o?"active":""),onClick:()=>r("layout")},"Layout"),(0,e.createElement)("button",{className:"tab "+("style"===o?"active":""),onClick:()=>r("style")},"Style"),(0,e.createElement)("button",{className:"tab "+("spacing"===o?"active":""),onClick:()=>r("spacing")},"Spacing")),"layout"===o&&(0,e.createElement)(l.PanelBody,{title:"Layout Settings",initialOpen:!0},(0,e.createElement)(l.RangeControl,{label:"Width (%)",value:t.width,onChange:e=>n({width:e}),min:1,max:100}),(0,e.createElement)(l.SelectControl,{label:"Content Alignment",value:t.contentAlignment,options:[{label:"Left",value:"left"},{label:"Center",value:"center"},{label:"Right",value:"right"}],onChange:e=>n({contentAlignment:e})}),(0,e.createElement)(l.SelectControl,{label:"Vertical Alignment",value:t.verticalAlignment,options:[{label:"Top",value:"flex-start"},{label:"Center",value:"center"},{label:"Bottom",value:"flex-end"}],onChange:e=>n({verticalAlignment:e})})),"style"===o&&(0,e.createElement)(l.PanelBody,{title:"Style Settings",initialOpen:!0},(0,e.createElement)(a.ColorPalette,{value:t.backgroundColor,onChange:e=>n({backgroundColor:e}),label:"Background Color"}),(0,e.createElement)(l.RangeControl,{label:"Border Width",value:t.borderWidth,onChange:e=>n({borderWidth:e}),min:0,max:10}),(0,e.createElement)(a.ColorPalette,{value:t.borderColor,onChange:e=>n({borderColor:e}),label:"Border Color"}),(0,e.createElement)(l.RangeControl,{label:"Border Radius",value:t.borderRadius,onChange:e=>n({borderRadius:e}),min:0,max:50})),"spacing"===o&&(0,e.createElement)(l.PanelBody,{title:"Spacing Settings",initialOpen:!0},(0,e.createElement)("p",null,"Padding"),["top","right","bottom","left"].map((a=>(0,e.createElement)(l.RangeControl,{key:`padding-${a}`,label:a.charAt(0).toUpperCase()+a.slice(1),value:t.padding[a],onChange:e=>i("padding",a,e),min:0,max:100}))),(0,e.createElement)("p",null,"Margin"),["top","right","bottom","left"].map((a=>(0,e.createElement)(l.RangeControl,{key:`margin-${a}`,label:a.charAt(0).toUpperCase()+a.slice(1),value:t.margin[a],onChange:e=>i("margin",a,e),min:0,max:100}))))),(0,e.createElement)("div",{className:"gutenberg-layout-blocks-column",style:{width:`${t.width}%`,textAlign:t.contentAlignment,backgroundColor:t.backgroundColor,padding:`${t.padding.top}px ${t.padding.right}px ${t.padding.bottom}px ${t.padding.left}px`,margin:`${t.margin.top}px ${t.margin.right}px ${t.margin.bottom}px ${t.margin.left}px`,borderWidth:`${t.borderWidth}px`,borderStyle:t.borderWidth>0?"solid":"none",borderColor:t.borderColor,borderRadius:`${t.borderRadius}px`,display:"flex",flexDirection:"column",justifyContent:t.verticalAlignment}},(0,e.createElement)(a.InnerBlocks,null)))},save:({attributes:t})=>(0,e.createElement)("div",{className:"gutenberg-layout-blocks-column",style:{width:`${t.width}%`,textAlign:t.contentAlignment,backgroundColor:t.backgroundColor,padding:`${t.padding.top}px ${t.padding.right}px ${t.padding.bottom}px ${t.padding.left}px`,margin:`${t.margin.top}px ${t.margin.right}px ${t.margin.bottom}px ${t.margin.left}px`,borderWidth:`${t.borderWidth}px`,borderStyle:t.borderWidth>0?"solid":"none",borderColor:t.borderColor,borderRadius:`${t.borderRadius}px`,display:"flex",flexDirection:"column",justifyContent:t.verticalAlignment}},(0,e.createElement)(a.InnerBlocks.Content,null))})})();