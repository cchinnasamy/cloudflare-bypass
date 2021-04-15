addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const json = await request.json()
  
  let url = json.url
  const uri = new URL(url)
  
  let newHdrs = new Headers()

  newHdrs.set('Host', uri.hostname)
  newHdrs.set('X-Forwarded-For', json.forward_ip)

  console.log(url + " -> " + uri.hostname + " -> "+json.forward_ip)

  const init = {
    body: json.body,
    headers: newHdrs,
    method: json.method
  }

  let response = await fetch (url, init);
  return response
}

//  sample payload
// {"url": "http://httpbin.org/ip", "method":"GET", "forward_ip": "1.2.2.4"}
