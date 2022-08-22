addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled())
})

import { Octokit } from '@octokit/core'

async function handleScheduled() {
  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  })

  const data = await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
    owner: 'ferrykepolow',
    repo: 'benchmark-cron',
    event_type: 'cloudflare-worker',
  })

  console.log(await data.status)

  return new Response(JSON.stringify({ ok: true }))
}
