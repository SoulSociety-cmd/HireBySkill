const http = require('http');
const vm2 = require('vm2');
const puppeteer = require('puppeteer');
const { ESLint } = require('eslint');
const bigo = require('js-big-o');

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/run') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { code, testCases, type = 'js' } = JSON.parse(body);
        
        const results = {
          testsPassed: 0,
          totalTests: testCases.length,
          eslintScore: 0,
          bigOScore: '',
          errors: [],
          output: ''
        };

        // 1. Run test cases in VM sandbox
        const vm = new vm2.VM({
          timeout: 2000,
          sandbox: { console },
          require: { external: false }
        });

        for (let i = 0; i < testCases.length; i++) {
          const tc = testCases[i];
          try {
            const userFn = vm.run(`(${code})`);
            const output = userFn(tc.input);
            if (String(output).trim() === tc.expectedOutput.trim()) {
              results.testsPassed++;
            }
          } catch (e) {
            results.errors.push(`Test ${i+1}: ${e.message}`);
          }
        }

        // 2. ESLint score
        const eslint = new ESLint({
          useEslintRc: false,
          overrideConfigFile: '/app/eslint.config.js'
        });
        const eslintResults = await eslint.lintText(code);
        const errors = eslintResults[0]?.messages || [];
        results.eslintScore = Math.max(0, 100 - (errors.length * 5));

        // 3. Big-O analysis (simple)
        try {
          results.bigOScore = bigo(code).timeComplexity;
        } catch {}

        // 4. Puppeteer test (if HTML)
        if (type === 'html') {
          const browser = await puppeteer.launch({ headless: true });
          const page = await browser.newPage();
          await page.setContent(code);
          // Simple functional test
          await page.waitForTimeout(1000);
          results.output = await page.content();
          await browser.close();
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Sandbox runner ready on port 3000');
});

