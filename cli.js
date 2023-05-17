#!/usr/bin/env node
import { mdLinks } from './index.js';
import { printLista, printListaValidada, printEstatistica, printBroken } from './calculo.js';
 
const pathFile = process.argv[2]; //pathFile
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
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
           console.error('Erro:', erro);
       });
   }

executaMdLinks(pathFile, options)
