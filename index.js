var fs = require('fs');
var html = fs.readFileSync('./epReader.html').toString();

(async()=>{
	var object = { episdodios: JSON.parse(fs.readFileSync('./onepiece.json')), contNextEp: 463, contEpAtual: 462, contArray: 0 }
	setInterval(()=>{
	object.contNextEp++
	object.contEpAtual++
	if(object.episdodios[object.contArray].link[0] == null) object.episdodios[object.contArray].link[0] = ['null']
	fs.mkdir(`./${object.contEpAtual}`, async(res)=>{
		var replaceHtml = html
		.replace('{urlep}', object.episdodios[object.contArray].link[0])
		.replace('{titleep}', object.episdodios[object.contArray].titulo)
		.replace('{proximoep}', object.contNextEp)
		await fs.writeFileSync(`./${object.contEpAtual}/index.html`, replaceHtml)
	})
	}, 3000)

})();