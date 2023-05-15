import { mdLinks } from './index.js';
import fs from 'fs';
import { jest } from '@jest/globals';
import { printLista, printListaValidada, printEstatistica, printBroken } from 'cli.js';
import chalk from 'chalk';
import { executaMdLinks } from 'cli.js';

//const mdLinks = require('../');


//describe('mdLinks', () => {

  //it('should...', () => {
    //console.log('FIX ME!');
  //});

//});

describe('mdLinks', () => {
  test('should return a promise', () => {
    const result = mdLinks('README.md');
    expect(result instanceof Promise).toBe(true);
  });
  test('should reject promise if file does not exist or is empty', () => {
    const fileExistsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const fileSizeSpy = jest.spyOn(fs, 'statSync').mockReturnValue({ size: 0 });

    return mdLinks('README.md').catch((error) => {
      expect(error).toBeTruthy();
      fileExistsSpy.mockRestore();
      fileSizeSpy.mockRestore();
    });
  });

  test('should resolve promise with an array of objects with href, text and file properties', () => {
    const fileContent = '[Google](https://www.google.com)';
    const fileExistsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const fileSizeSpy = jest.spyOn(fs, 'statSync').mockReturnValue({ size: fileContent.length });
    const readFileSpy = jest.spyOn(fs, 'readFile').mockImplementation((path, options, callback) => {
      callback(null, fileContent);
    });

    const expectedOutput = [
      {
        href: 'https://www.google.com',
        text: 'Google',
        file: 'README.md',
      },
    ];

    return mdLinks('README.md').then((result) => {
      expect(result).toEqual(expectedOutput);
      fileExistsSpy.mockRestore();
      fileSizeSpy.mockRestore();
      readFileSpy.mockRestore();
    });
  });
});



describe('mdLinks', () => {
  describe('quando a extensão do arquivo é inválida', () => {
    it('deve rejeitar a promessa com uma mensagem de erro', () => {
      const path = 'arquivo.txt';
      const options = {};
      const resultado = mdLinks(path, options);

      return resultado.catch((erro) => {
        expect(erro.message).toEqual('extensao-invalida');
      });
    });
  });

  describe('quando o arquivo ou diretório não existem', () => {
    it('deve rejeitar a promessa com uma mensagem de erro', () => {
      const path = 'texto.md';
      const options = {};
      const resultado = mdLinks(path,options);
      return resultado.catch((erro) => {
        expect(erro.message).toEqual('arquivo-inexistente');
      });
    });
  });

  describe('quando o arquivo fornecido não possui links', () => {
    it('deve rejeitar a promessa com uma mensagem de erro', () => {
      const path = './arquivos/texto-sem-link.md';
      const options = {};
      const resultado = mdLinks(path, options);
          return resultado.catch((erro) => {
            expect(erro.message).toEqual('arquivo-sem-link');
          });
        }
      );
    });
  
  describe('quando a opção "validate" é passada', () => {
    it('deve retornar um array de objetos com os atributos "href", "text", e "status"', () => {
      jest.setTimeout(600000);

      const path = 'texto.md';
      const options = { validate: true };
      return mdLinks(path, options).then((links) => {
        console.log(links)
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBeGreaterThan(0);
        links.forEach((link) => {
          expect(link).toHaveProperty('href');
          expect(link).toHaveProperty('text');
          expect(link).toHaveProperty('status');
        });
      });
    });
  });
  
});



const consoleLog = jest.spyOn(global.console, 'log');

describe('cli', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('executaMdLinks', () => {
    it('deve buscar e imprimir a lista de links corretamente', () => {
      const caminho = 'texto.md';
      const options = { validate: false, stats: false };
      const linksEncontrados = [
        {
          href: 'https://gabrieluizramos.com.br/modulos-em-javascript',
          text: 'Gabriel Luiz Ramos',
          file: 'texto.md',
        },
        {
          href: 'https://12313',
          text: 'Link quebrado',
          file: 'texto.md',
        },
      ];

      const lista = linksEncontrados.map((item) => {
        const linha = `${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)}`;
        return linha;
      }).join('\n\n');

      return executaMdLinks(caminho, options)
        .then(() => {
          expect(consoleLog).toBeCalledWith(
            chalk.hex('#4BFAF4')('\n'),
            '\n\n',
            lista);
        });
    });

    it('deve buscar, validar e imprimir a lista de links corretamente', () => {
      const caminho = 'texto.md';
      const options = { validate: true, stats: false };
      const linksEncontrados = [
        {
          href: 'https://gabrieluizramos.com.br/modulos-em-javascript',
          text: 'Gabriel Luiz Ramos',
          file: 'texto.md',
          status: 200,
          ok: true
        },
        {
          href: 'https://12313',
          text: 'Link quebrado',
          file: 'texto.md',
          status: 'ocorreu algum erro',
          ok: false
        },
      ];

      const lista = linksEncontrados.map((item) => {
        const linha = `${item.ok ? chalk.green('\u2714') : chalk.red('\u2718')} ${chalk.black.bgCyan(item.file)} | ${chalk.cyan(item.href)} | ${chalk.cyan(item.text)} | ${item.ok ? chalk.green('ok') : chalk.red('fail')} | ${item.status === undefined ? '' : item.status}`;
        return linha;
      }).join('\n\n');

      return executaMdLinks(caminho, options)
        .then(() => {
          expect(consoleLog).toBeCalledWith(
            chalk.hex('#4BFAF4')(
              '\n',
              `   ╔══════════════════════╗
    ║ Lista de links \ud83d\udd0d \ud83d\udcc4 ║
    ╚══════════════════════╝`,
            ),
            '\n\n',
            lista);
        });
    });

    it('deve buscar, calcular as estatisticas e imprimi-las corretamente', () => {
      const caminho = 'texto.md';
      const options = { validate: false, stats: true };

      return executaMdLinks(caminho, options)
        .then(() => {
          let resultado = ''
          resultado += chalk.hex('#F56327')('\n', `Estatísticas dos Links \ud83d\udcca`);
          resultado += `\n\n${chalk.hex('#FA956F')('Total de links:')} ${chalk.yellow(2)}`;
          resultado += `\n${chalk.hex('#FA956F')('Links únicos:')} ${chalk.yellow(2)}`;

          expect(consoleLog).toHaveBeenCalledWith(resultado);
        });
    });

    it('deve buscar, validar, calcular as estatisticas e imprimi-las corretamente', () => {
      const caminho = 'texto.md';
      const options = { validate: true, stats: true };

      return executaMdLinks(caminho, options)
        .then(() => {
          let resultado = ''
          resultado += chalk.hex('#F56327')('\n', `Estatísticas dos Links \ud83d\udcca`);
          resultado += `\n\n${chalk.hex('#FA956F')('Total de links:')} ${chalk.yellow(2)}`;
          resultado += `\n${chalk.hex('#FA956F')('Links únicos:')} ${chalk.yellow(2)}`;
          resultado += `\n${chalk.hex('#FA956F')('Links quebrados:')} ${chalk.red(1)}`;

          expect(consoleLog).toHaveBeenCalledWith(resultado);
        });
    });

    it('deve imprimir mensagem de erro quando o arquivo informado não existe', () => {
      const caminho = './arquivos/inexistente.md';
      const options = { validate: false, stats: false };

      return executaMdLinks(caminho, options)
        .catch((err) => {
          expect(consoleLog).toHaveBeenCalledWith(chalk.hex('#FB80A7')(` \n O arquivo/diretório que você está tentando acessar em '${chalk.hex('#FA3473').underline(caminho)}' não existe.\nPor favor, verifique se você digitou corretamente o nome do arquivo/diretório e tente novamente. \n`));
        });
    });

    it('deve imprimir mensagem de erro quando o arquivo não contém links', () => {
      const caminho = './arquivos/texto-sem-link.md';
      const options = { validate: false, stats: false };

      return executaMdLinks(caminho, options)
        .catch((err) => {
          expect(consoleLog).toHaveBeenCalledWith(chalk.hex('#FB69C3')(`Não encontramos nenhum link neste arquivo!\n`));
        });
    });

    it('deve imprimir mensagem de erro quando a extensão do arquivo é inválida', () => {
      const caminho = './arquivos/texto.html';
      const options = { validate: false, stats: false };

      return executaMdLinks(caminho, options)
        .catch((err) => {
          expect(consoleLog).toHaveBeenCalledWith(chalk.hex('#FB80A7')(` \n O arquivo encontrado em '${chalk.hex('#FA3473').underline(arquivo)}' não é formato markdown. \n`));
        });
    });
  });
});