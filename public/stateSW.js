self.addEventListener('install', function (event) {
  console.log('Worker installed');
});

self.addEventListener('message', async (event) => {
  await broadcastToAllClients(event.data);
});


async function broadcastToAllClients(data) {
  const clients = await self.clients
    .matchAll({
      includeUncontrolled: true,
      type: 'window'
    });

  clients.forEach((client) => {
    client.postMessage(data);
  });
}