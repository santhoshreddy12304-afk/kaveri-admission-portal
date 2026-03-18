const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Starting puppeteer...');
    const browser = await puppeteer.launch({ 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Capture page errors
    page.on('pageerror', error => {
      console.log('PAGE ERROR:', error.message);
    });
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('CONSOLE ERROR:', msg.text());
      }
    });

    console.log('Navigating to preview server...');
    // Assuming preview server runs on 4173
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
    
    console.log('Page loaded. Capturing content...');
    const content = await page.content();
    if (content.includes('Matrix Critical Failure')) {
        console.log('SUCCESS: ErrorBoundary was triggered!');
    } else {
        console.log('ERROR: ErrorBoundary was NOT triggered locally.');
    }
    
    await browser.close();
  } catch (err) {
    console.error('Puppeteer Script Error:', err);
  }
})();
