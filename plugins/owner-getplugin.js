/*import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const exec = promisify(_exec).bind(cp);

const handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
  const ar = Object.keys(plugins);
  const ar1 = ar.map((v) => v.replace('.js', ''));

  if (!text) {
    return conn.reply(m.chat, `*${xowner} Por favor, ingresa el nombre de algún plugin (archivo) existente*\n> *\`Ejemplo:\`* ${usedPrefix + command} info-totalf\n\nᰨᰍ *Lista de plugins existentes:*\nꕤ ${ar1.map((v) => ' ' + v).join`\nꕤ`}`, m);
  }

  if (!ar1.includes(text)) {
    return conn.reply(m.chat, `*☁️ No se encontró ningún plugin llamado \`${text}\` ingresa alguno existente*\n\n*Lista de plugins existentes:*\nꕤ ${ar1.map((v) => ' ' + v).join`\nꕤ`}`, m);
  }

  let o;
  try {
    o = await exec('cat plugins/' + text + '.js');
  } catch (e) {
    o = e;
  } finally {
    const { stdout, stderr } = o;
    //if (stdout.trim()) {
       const aa = await conn.sendMessage(m.chat, { text: stdout }, { quoted: m });
      await conn.sendMessage(m.chat, { document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js` }, { quoted: m });
    }
    if (stderr.trim()) {
      // const aa2 = await conn.sendMessage(m.chat, { text: stderr }, { quoted: m });
      await conn.sendMessage(m.chat, { document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js` }, { quoted: m });
    }
  }
};

handler.help = ['getplugin']
handler.tags = ['owner'];
handler.command = ['getplugin', 'plugin'];
handler.rowner = true;

export default handler;*/
import fs from 'fs';

const handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
  const ar = fs.readdirSync('./plugins').filter(v => v.endsWith('.js'));
  const ar1 = ar.map(v => v.slice(0, -3)); // quita la extensión .js

  if (!text) {
    return conn.reply(m.chat, `*${xowner} Por favor, ingresa el nombre de un plugin existente.*\n\n*Ejemplo:* ${usedPrefix + command} info-totalf\n\n*Plugins disponibles:*\n${ar1.map(v => `  ꕤ ${v}`).join('\n')}`, m);
  }

  if (!ar1.includes(text)) {
    return conn.reply(m.chat, `*☁️ No se encontró ningún plugin llamado \`${text}\`.*\n\n*Lista de plugins existentes:*\n${ar1.map(v => `  ꕤ ${v}`).join('\n')}`, m);
  }

  try {
    const content = await fs.promises.readFile(`./plugins/${text}.js`, 'utf8');
    await conn.sendMessage(m.chat, { text: content }, { quoted: m });
  } catch (err) {
    await conn.reply(m.chat, `⚠️ Ocurrió un error al leer el plugin:\n\n${err.message}`, m);
  }
};

handler.help = ['getplugin']
handler.tags = ['owner']
handler.command = ['getplugin', 'plugin']
handler.rowner = true

export default handler;