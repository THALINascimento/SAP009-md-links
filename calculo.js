/*function realizaMdLinks2(caminho, options){
  return mdLinks(caminho, options)
      .then((resultado) => {
        if(options.validate) {
          const lista = resultado.map((item) => {
            const ok = item.ok ? '\u2714' : '\u2718';
            const status = item.ok ? 'ok' : 'fail';
            const linha = `${ok} ${item.file} | ${item.href} | ${item.text} | ${status} | ${item.status}`;
            return linha;
          }).join('\n\n');
            console.log(lista)
          }
          return resultado
        })
        .then((resultado) => {
        if(options.stats) {
          const ResultadoStats = stats(resultado)
            let retorno = '';
      retorno += `\n\nTotal de links: ${ResultadoStats.totalLinks}`;
      retorno += `\nLinks únicos: ${ResultadoStats.uniqueLinks}`;
      console.log(retorno)
                      }
                      return resultado
        }).then((resultado) => {
          const lista = resultado.map((item) =>{
            const linha = `${item.file} | ${item.href} | ${item.text}`;
            return linha;
          }).join('\n\n');
            console.log(lista)
            return resultado
          }
          )
      }
    
  
      realizaMdLinks2(pathFile, options)*/

    
      
    // let retorno = '';
    // retorno += `\n\nTotal de links: ${stats.totalLinks}`;
    // retorno += `\nLinks únicos: ${stats.uniqueLinks}`;
    
    
    // resultado +=`\nLinkes quebrados: ${stats.brokenLinks}`
    // retorno += '\n' + 'Estatísticas dos Links \ud83d\udcca';



// mdLinks(pathFile, options)
// .then((links) => {
//   console.log(links);
//   if (options.stats){
  //     console.log(stats(links))
//   }
// }).catch((err) => {
//   console.error(err);
// });

/*if (
  erro instanceof Error &&
  erro.code === 'UND_ERR_CONNECT_TIMEOUT' &&
  erro.cause &&
  erro.cause.code === 'UND_ERR_CONNECT_TIMEOUT'
) {
  console.error('Erro de conexão: tempo limite de conexão excedido.');
} else {
  console.error('Erro:', erro);
}
;*/
