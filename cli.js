#!/usr/bin/env node
import { mdLinks } from './index.js';
import chalk from 'chalk';
import { calculo } from './index.js';
 
const pathFile = process.argv[2]; //pathFile
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
}
 //console.log(pathFile)
 //console.log(options)
  //console.log(mdLinks(pathFile, options))
 //console.log(stats())
  
 //como deve retornar ?
 /* md-links src/texto.md (file, href, text)
 md-links src/texto.md --v ((file, href, text, status ok ou fail e referencia )
 md-links src/texto.md --s (estatiticas href total e unico)
 md-links src/texto.md --s --v ou --v --s (anterior + quebrados*/
 
 function printLista(resultado) {
  const lista = resultado.map((item) => {
    const linha = ` ${chalk.black.magentaBright(item.file)} | ${chalk.blueBright(item.href)} | ${chalk.bgYellow(item.text)}`;
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
   
  retorno += chalk.hex('#A569BD')('\n',` Estatísticas dos Links \u2764`);
  retorno += `\n\n${chalk.hex('#B19CD9')('Total de links:')} ${chalk.yellow(stats.totalLinks)}`;
  retorno += `\n${chalk.hex('#B19CD9')('Links únicos:')} ${chalk.yellow(stats.uniqueLinks)}`;

  console.log(retorno);    
}

export function printBroken(links) {
  const stats = calculo(links);
  let retorno = '';
   


  retorno += chalk.hex('#A569BD')('\n', `Estatísticas dos Links \u2764`);
  retorno += `\n\n${chalk.hex('#B19CD9')('Total de links:')} ${chalk.yellow(stats.totalLinks)}`;
  retorno += `\n${chalk.hex('#B19CD9')('Links únicos:')} ${chalk.yellow(stats.uniqueLinks)}`;
  retorno += `\n${chalk.hex('#B19CD9')('Links quebrados:')} ${chalk.red(stats.brokenLinks)}`;

  console.log(retorno);  
   
 }

export function executaMdLinks(pathFile, options) {
  return mdLinks(pathFile, options)
    .then((resultado) => {
       if (options.stats && options.validate) {
          printBroken(resultado)
           return ;
         }
      if (options.stats) {
       printEstatistica(resultado);
        return;
      } 
      if (options.validate) {
        printListaValidada(resultado);
      return;
      } 
      printLista(resultado);
     
    })
    .catch((erro) => {     
       if (
           erro instanceof Error &&
           erro.code === 'UND_ERR_CONNECT_TIMEOUT' &&
           erro.cause &&
           erro.cause.code === 'UND_ERR_CONNECT_TIMEOUT'
         ) {
           console.error('Erro de conexão: tempo limite de conexão excedido.');
         } else {
           console.error('Erro:', erro);
         }
       });
   }

executaMdLinks(pathFile, options)
