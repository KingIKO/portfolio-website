import { readFileSync, writeFileSync } from 'node:fs';
import { caseStudies } from '../src/content.js';
const resume = JSON.parse(readFileSync(new URL('../src/resume.json', import.meta.url), 'utf8'));
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const list = (items) => `<ul>${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ul>`;
const resumeHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kingsley Okoli - Resume</title>
<style>
@page { size: Letter; margin: .4in .48in; }
* { box-sizing: border-box; } body { margin: 0; font: 10.2pt/1.22 Arial,sans-serif; color:#252522; background:#fff; }
a { color: inherit; } main { max-width: 760px; margin: auto; } h1 { margin:0 0 4px; font-size:25pt; letter-spacing:-.7px; } .headline { font-size:10pt;font-weight:bold;margin:0 0 8px; }
.contact { font-size:9pt;line-height:1.5;margin:0 0 12px; } .summary { margin:0 0 12px; } h2 { font-size:10pt;margin:11px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px; } h3 { font-size:11pt; margin:0; } .row { display:flex;justify-content:space-between;gap:15px;margin:6px 0 3px;align-items:baseline; } .row span { font-size:9pt;white-space:nowrap; } .role { font-weight:bold;font-size:10pt; } ul { padding-left:15px;margin:5px 0 9px; } li { margin-bottom:4px; } .skills p { margin:3px 0; font-size:9.6pt; } .back { margin:0 0 24px; }
@media screen { body { padding:32px 24px;background:#f6f4f0; } main { background:white;padding:35px; } }
@media(max-width:600px) { body { padding:16px; } main { padding:20px; } .row { flex-wrap:wrap;gap:3px; } }
@media print { .back { display:none; } a { text-decoration:none; } h2,h3,.row { break-after:avoid; } li { break-inside:avoid; } }
</style></head><body><main><p class="back"><a href="./">Back to portfolio</a> / <a href="./Kingsley-Okoli-Public-Resume.pdf">Download PDF</a></p>
<header><h1>Kingsley Okoli</h1><p class="headline">${escape(resume.headline)}</p><p class="contact">Manhattan, NY | <a href="mailto:kingsleyiokoli@gmail.com">kingsleyiokoli@gmail.com</a><br><a href="https://www.linkedin.com/in/kingsley-okoli">linkedin.com/in/kingsley-okoli</a></p></header>
<p class="summary">${escape(resume.summary)}</p>
<section><h2>EXPERIENCE</h2><div class="row"><h3>Sellfire</h3><span>Aug 2025 - Present</span></div><div class="row"><span class="role">QA Engineer</span><span>New York, NY</span></div>${list(resume.sellfire)}
<div class="row"><h3>Rapptr Labs</h3><span>Nov 2021 - Aug 2025</span></div><div class="row"><span class="role">Software Development Engineer in Test</span><span>Aug 2024 - Aug 2025</span></div>${list(resume.rapptr)}<div class="row"><span class="role">QA Tester</span><span>Nov 2021 - Aug 2024</span></div>${list(resume.junior)}</section>
<section><h2>INDEPENDENT PROJECT</h2><div class="row"><h3>HallPass</h3><a href="https://hallpass.me">hallpass.me</a></div>${list(resume.project)}</section>
<section class="skills"><h2>TECHNICAL SKILLS</h2>${resume.skills.map(([name, skills]) => `<p><strong>${escape(name)}:</strong> ${escape(skills)}</p>`).join('')}</section>
<section><h2>EDUCATION</h2><div class="row"><span>B.S. Computer Science | Fairleigh Dickinson University</span><span>2020</span></div></section></main></body></html>`;
writeFileSync(new URL('../public/Kingsley-Okoli-Public-Resume.html', import.meta.url), resumeHtml);

const cases = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Selected work | Kingsley Okoli</title><meta name="description" content="Test infrastructure, AI testing systems, and production investigations by Kingsley Okoli."><style>
*{box-sizing:border-box}html{scroll-padding-top:30px}body{margin:0;background:#f6f4f0;color:#252522;font:16px/1.8 Arial,sans-serif}header,main,footer{width:min(100% - 48px,700px);margin:auto}header{padding-block:30px;border-bottom:1px solid #dedbd3}a{color:inherit;text-underline-offset:5px}h1,h2{font-family:Georgia,serif;font-weight:normal;line-height:1.3}h1{font-size:40px;margin:50px 0 20px}h2{font-size:28px}.intro,p{color:#63635b}article{border-top:1px solid #dedbd3;margin-top:40px;padding-top:25px;scroll-margin-top:24px}.category{color:#806019;font-size:13px}footer{padding-block:40px}a:focus-visible{outline:2px solid #806019;outline-offset:4px}
</style></head><body><header><a href="../">Kingsley Okoli / Portfolio</a></header><main><h1>Selected work</h1><p class="intro">How I build and operate testing infrastructure, direct AI-assisted testing, and investigate production failures.</p>${caseStudies.map((study) => `<article id="${study.id}"><p class="category">${escape(study.category)}</p><h2>${escape(study.title)}</h2>${study.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}</article>`).join('')}</main><footer><a href="../#contact">Get in touch</a></footer></body></html>`;
writeFileSync(new URL('../public/case-files/index.html', import.meta.url), cases);
console.log('Updated public resume HTML and compatible case-study pages.');
