import fs from 'fs';
import path from 'path';

const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\.s?#].[^\s]*)\)/gm;
   const enconding = 'utf-8';
function extrairLinks(caminhoDosLinks) {
  return new Promise ((resolve, reject) => {
fs.readFile(caminhoDosLinks, enconding, (err, data) => {
  if(err) {
    reject(err);
  }else {
    const itensExtraidos = [...data.matchAll(regex)];
    const conteudo = itensExtraidos.map((itemExtraido) => ({
      text: itemExtraido[1],
      href: itemExtraido[2],
      file: caminhoDosLinks,
    }));
    resolve(conteudo);
  }
});
});
}
// extrairLinks('src/texto.md')
//   .then((conteudo) => console.log(conteudo))
//   .catch((err) => console.error(err));

export function calculo (links) {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map(link => link.href)).size;
  const brokenLinks = links.filter(link => link.ok === 'fail').length; 
  const stats = {
        totalLinks,
        uniqueLinks,
        brokenLinks,
      };
      if (brokenLinks > 0){
        stats.brokenLinks = brokenLinks
      }

  /*console.log(`Total: ${stats.totalLinks}`);
  console.log(`Unique: ${stats.uniqueLinks}`);
  console.log(`Broken: ${stats.brokenLinks}`);*/

  return stats;
}

export function mdLinks (pathFile, options = {validate: false, stats: false}) {
  const tamanhoArquivo = fs.statSync(pathFile).size;
   const extensao = path.extname(pathFile);
  if(tamanhoArquivo === 0){
  throw new Error(`O arquivo ${pathFile} está vazio`);
  }
  if(extensao !== '.md'){
    throw new Error('Extensão inválida');
  }
 return new Promise((resolve, reject) => {
extrairLinks(pathFile).then((links) => {
  if (options.validate) {
    const promises = links.map((link) => {
      return fetch(link.href)
        .then((response) => {
          link.status = response.status;
          link.ok = response.ok //? "ok" : "fail";
          return link;
        })
        .catch((error) => {
          console.log(error)
          link.status = "error";
          link.ok = "fail";
          return link;
        });
    });
    Promise.all(promises)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    resolve(links);
  }
})
.catch((err) => {
  reject(err);
});
});
}

/*export function mdLinks2 (pathFile, options = {validate: false }) {
  const tamanhoArquivo = fs.statSync(pathFile).size;
   const extensao = path.extname(pathFile);
  if(tamanhoArquivo === 0){
  throw new Error(`O arquivo ${pathFile} está vazio`);
  }
  if(extensao !== '.md'){
    throw new Error('Extensão inválida');
  }
 return new Promise((resolve, reject) => {
extrairLinks(pathFile).then((links) => {
  if (options.validate) {
    const promises = links.map((link) => {
      return fetch(link.href)
        .then((response) => {
          link.status = response.status;
          link.ok = response.ok //? 'ok' : 'fail';
          return link;
        })
        .catch((error) => {
          console.log(error)
          //link.status = 'error';
          link.ok = 'fail';
          return link;
        });
    });
    Promise.all(promises)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    resolve(links);
  }
})
.catch((err) => {
  reject(err);
});
});

  
}
// mdLinks('src/texto.md', {validate: true})
// .then((links) => {
//   console.log(links);
// }).catch((err) => {
//   console.error(err);
// });
*/