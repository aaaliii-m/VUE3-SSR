import express from 'express'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './app.js'

const server = express()
server.use(express.static('.'));

server.get('/', (req, res) => {
    const app = createApp();
    renderToString(app).then((html) => {
        res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
        {
            "imports": {
                "vue": "/node_modules/vue/dist/vue.esm-browser.prod.js"
            }
        }
</script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="module" src="/client.js"></script>
      </body>
    </html>
    `)
    })
})

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
})
