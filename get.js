
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  
  request = new Request(request)
  
  const { searchParams } = new URL(request.url)
  let url = searchParams.get('url') 
  let forward = searchParams.get('forward') 
  const uri = new URL(url)

  let newHdrs = new Headers()
  for (const [key, value] of request.headers) {
    if (key.toLowerCase().startsWith('cf-')) {
        continue;
    }
    if (key.toLowerCase() == 'x-forwarded-for') {
        continue;
    }
    if (key.toLowerCase() == 'x-real-ip') {
        continue;
    }
    newHdrs.set(key, value)
  }
  newHdrs.set('Host', uri.hostname)
  newHdrs.set('X-Forwarded-For', forward)
  newHdrs.set('cookie', request.headers.get('cookie'))

  const init = {
    body: request.body,
    headers: newHdrs,
    method: request.method,
    
  }
  
  let response = await fetch (url, init);
  return response
  return new Response(request.headers.get('cookie'), {
    status: 200
  })

}
