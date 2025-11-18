const { fetchCimaNow } = require('./scraper');
const cheerio = require('cheerio');
const fs = require('fs');

async function comprehensiveDebug() {
  console.log('🔍 COMPREHENSIVE DEBUG\n');

  const url = 'https://cimanow.cc/category/افلام-عربية/';

  try {
    const html = await fetchCimaNow(url);
    console.log(`✅ Fetched ${html.length} bytes\n`);

    // Save HTML to file for inspection
    fs.writeFileSync('debug-output.html', html, 'utf8');
    console.log('💾 Saved HTML to debug-output.html\n');

    const $ = cheerio.load(html);

    // 1. Check for JavaScript-rendered indicators
    console.log('🔍 JavaScript Rendering Checks:');
    console.log(`  React root: ${$('#root, #app, [data-reactroot]').length > 0}`);
    console.log(`  Vue app: ${$('[data-v-]').length > 0}`);
    console.log(`  Next.js: ${$('#__next').length > 0}`);
    console.log(`  Nuxt: ${$('#__nuxt').length > 0}`);

    // 2. Check for data attributes
    console.log('\n📦 Data Attributes:');
    const dataElements = $('[data-posts], [data-movies], [data-content]');
    console.log(`  Elements with data-*: ${dataElements.length}`);
    dataElements.slice(0, 3).each((i, el) => {
      const attrs = Object.keys(el.attribs).filter(a => a.startsWith('data-'));
      console.log(`  ${i + 1}. ${attrs.join(', ')}`);
    });

    // 3. Look for JSON data in scripts
    console.log('\n📜 Script Tags:');
    let jsonFound = false;
    $('script').each((i, el) => {
      const content = $(el).html();
      if (content && (content.includes('window.__INITIAL') || content.includes('JSON.parse'))) {
        console.log(`  Found potential data in script ${i + 1}`);
        console.log(`  Content preview: ${content.substring(0, 100)}...`);
        jsonFound = true;
      }
    });
    if (!jsonFound) console.log('  No JSON data found in scripts');

    // 4. Check for API endpoints
    console.log('\n🌐 Looking for API patterns:');
    const scripts = $('script[src]');
    console.log(`  External scripts: ${scripts.length}`);
    scripts.slice(0, 5).each((i, el) => {
      console.log(`  ${i + 1}. ${$(el).attr('src')}`);
    });

    // 5. Check body structure
    console.log('\n📋 Body Structure:');
    const bodyChildren = $('body > *');
    console.log(`  Direct children of <body>: ${bodyChildren.length}`);
    bodyChildren.slice(0, 10).each((i, el) => {
      const tag = el.tagName;
      const id = $(el).attr('id') || '';
      const classes = $(el).attr('class') || '';
      console.log(`  ${i + 1}. <${tag}> ${id ? '#' + id : ''} ${classes ? '.' + classes.split(' ')[0] : ''}`);
    });

    // 6. Check for main content container
    console.log('\n🎯 Main Content Containers:');
    console.log(`  <main>: ${$('main').length}`);
    console.log(`  <section>: ${$('section').length}`);
    console.log(`  <article>: ${$('article').length}`);
    console.log(`  .container: ${$('.container').length}`);
    console.log(`  .content: ${$('.content').length}`);

    // 7. Look for any links
    console.log('\n🔗 Links Analysis:');
    const allLinks = $('a[href]');
    console.log(`  Total links: ${allLinks.length}`);
    const movieLinks = allLinks.filter((i, el) => {
      const href = $(el).attr('href');
      return href && (href.includes('فيلم') || href.includes('film') || href.includes('movie'));
    });
    console.log(`  Movie-related links: ${movieLinks.length}`);

    // 8. Check meta tags for clues
    console.log('\n📊 Meta Information:');
    console.log(`  Title: ${$('title').text()}`);
    console.log(`  OG Title: ${$('meta[property="og:title"]').attr('content')}`);
    console.log(`  Description: ${$('meta[name="description"]').attr('content')?.substring(0, 60)}...`);

    // 9. Check if using lazy loading
    console.log('\n🖼️  Image Loading:');
    const lazyImages = $('img[loading="lazy"], img[data-src], img[data-lazy]');
    console.log(`  Lazy-loaded images: ${lazyImages.length}`);

    // 10. Output first 1000 chars of body text
    console.log('\n📄 Body Text Content (first 500 chars):');
    const bodyText = $('body').text().trim().substring(0, 500);
    console.log(bodyText);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  }
}

comprehensiveDebug();