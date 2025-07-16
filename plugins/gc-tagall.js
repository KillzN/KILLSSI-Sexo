const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
  const oi = `🦦𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼𝙎:* ${pesan}`;
  let teks = `Monitos Días, ¡Despierten csmree!🌷☀*\n\n *${oi}\n\n➥ ➴ @ineffable.txssi ➶:\n`;
  for (const mem of participants) {
    teks += `*ʚ💙ɞ* @${mem.id.split('@')[0]}\n`;
  }
  teks += `*└ KɪʟʟSsɪBᴏᴛ ⇝@ineffable.txssi*`;
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};
handler.help = ['todos *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(tagall|t|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
export default handler;