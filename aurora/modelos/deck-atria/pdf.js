// Exporta saida/deck-static.html para saida/deck.pdf (Chrome headless) e lista textos que estouram a caixa.
const puppeteer=require('puppeteer');
(async()=>{const b=await puppeteer.launch({headless:'new',args:['--allow-file-access-from-files']});
const p=await b.newPage(); await p.setViewport({width:1920,height:1080});
await p.goto('file://'+__dirname+'/saida/deck-static.html',{waitUntil:'load'}); await p.evaluate(()=>document.fonts.ready);
console.log(await p.evaluate(()=>[...document.fonts].map(f=>f.family+f.weight+':'+f.status).join(' ')));
// texto que estoura a própria caixa
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('.tx')].map((e,i)=>({i,s:[...document.querySelectorAll('section')].indexOf(e.closest('section'))+1,t:e.textContent.slice(0,40),over:e.scrollHeight>e.clientHeight+2||e.scrollWidth>e.clientWidth+2})).filter(x=>x.over))));
await p.pdf({path:__dirname+'/saida/deck.pdf',width:'1920px',height:'1080px',printBackground:true,preferCSSPageSize:true});
await b.close();})();
