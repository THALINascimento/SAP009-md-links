import chalk from 'chalk';

export function calculo (links) {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map((link) => link.href)).size;
  const brokenLinks = links.filter((link) => link.ok === false).length;
  const stats = {
        totalLinks,
        uniqueLinks,
        brokenLinks
   
      };
      if (brokenLinks > 0){
        stats.brokenLinks = brokenLinks
      }
 

  return stats;
};

export function printLista(resultado) {
  const lista = resultado.map((item) => {
    const linha = `${chalk.black.magentaBright(item.file)} | ${chalk.blueBright(item.href)} | ${chalk.bgYellow(item.text)}`;
    return linha;
  }).join('\n\n');
  console.log('\n');
console.log(lista);
  
}

export function printListaValidada(resultado) {
  const lista = resultado.map((item) => {
    const linha = `${item.ok ? chalk.yellow('\uD83C\uDF55') : chalk.red('\u2718')} ${chalk.black.magentaBright(item.file)} | ${chalk.blueBright(item.href)} | ${chalk.bgYellow(item.text)} | ${item.ok ? chalk.green('ok') : chalk.red('fail')} | ${item.status}`;
    return linha;
  }).join('\n\n');
  console.log('\n');
  console.log(lista);
  
}

export function printEstatistica(links) {
  const stats = calculo(links);
  let retorno = '';
   
  retorno += chalk.hex('#A569BD')('\n',` \u{1F3C6} Estatísticas dos Links \u2764`);
  retorno += `\n\n${chalk.hex('#B19CD9')('Total de links:')} ${chalk.yellow(stats.totalLinks)}`;
  retorno += `\n${chalk.hex('#B19CD9')('Links únicos:')} ${chalk.yellow(stats.uniqueLinks)}`;

  console.log(retorno);    
}

export function printBroken(links) {
  const stats = calculo(links);
  let retorno = '';
   


  retorno += chalk.hex('#A569BD')('\n', `\u{1F3C6}Estatísticas dos Links \u2764 `);
  retorno += `\n\n${chalk.hex('#B19CD9')('Total de links:')} ${chalk.yellow(stats.totalLinks)}`;
  retorno += `\n${chalk.hex('#B19CD9')('Links únicos:')} ${chalk.yellow(stats.uniqueLinks)}`;
  retorno += `\n${chalk.hex('#B19CD9')('Links quebrados:')} ${chalk.red(stats.brokenLinks)}`;

  console.log(retorno);  
   
 }
