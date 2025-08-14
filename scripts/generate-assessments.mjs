import { mkdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import ts from 'typescript';

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split('\n')) {
    if (!line || line.startsWith(' ')) continue;
    const [key, ...rest] = line.split(':');
    if (!key) continue;
    data[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
  }
  return data;
}

function humanize(href) {
  const parts = href.split('/').filter(p => p && !['tech-leadership', 'blog', 'wiki'].includes(p));
  const slug = parts[parts.length - 1] || '';
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function defaultDesc(href) {
  if (href.includes('/wiki/')) return 'Wiki article with detailed guidance';
  if (href.includes('/blog/')) return 'Blog post with practical insights';
  if (href.includes('/tools/')) return 'Interactive tool or calculator';
  return 'Knowledge base resource';
}

async function resolveContentMeta(href) {
  let path = href.replace(/^\/tech-leadership\//, '');
  if (path.endsWith('/')) path = path.slice(0, -1);

  if (path.startsWith('wiki/')) {
    const rel = path.replace(/^wiki\//, '');
    const base = join('src', 'content', 'wiki', rel);
    let fileContent;
    try {
      fileContent = await readFile(base + '.md', 'utf8');
    } catch {
      try {
        fileContent = await readFile(join(base, 'index.md'), 'utf8');
      } catch {
        return {};
      }
    }
    return parseFrontmatter(fileContent);
  } else if (path.startsWith('blog/')) {
    const rel = path.replace(/^blog\//, '') + '.md';
    try {
      const fileContent = await readFile(join('src', 'content', 'blog', rel), 'utf8');
      return parseFrontmatter(fileContent);
    } catch {
      return {};
    }
  }
  return {};
}

async function enrichNextSteps(assessments) {
  for (const assessment of assessments) {
    const recs = assessment.scoring?.recommendations || [];
    for (const rec of recs) {
      if (!rec.nextSteps) continue;
      rec.nextSteps = await Promise.all(
        rec.nextSteps.map(async step => {
          const href = typeof step === 'string' ? step : step.href;
          const meta = await resolveContentMeta(href);
          return {
            href,
            title: meta.title || (typeof step === 'string' ? humanize(href) : step.title),
            description: meta.description || (typeof step === 'string' ? defaultDesc(href) : step.description)
          };
        })
      );
    }
  }
}

async function loadAssessments() {
  const source = await readFile('src/data/assessments.ts', 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(transpiled).toString('base64');
  const mod = await import(moduleUrl);
  return mod.assessments;
}

const assessments = await loadAssessments();
await enrichNextSteps(assessments);
const outputDir = join(process.cwd(), 'public', 'tech-leadership', 'assessments');
await mkdir(outputDir, { recursive: true });

const indexData = assessments.map(({ id, title, description, type, category, estimatedTime, tags, version, updatedAt }) => ({
  id,
  title,
  description,
  type: type ?? 'questionnaire',
  category,
  estimatedTime,
  tags,
  version,
  updatedAt
}));

await writeFile(join(outputDir, 'index.json'), JSON.stringify(indexData, null, 2));
for (const assessment of assessments) {
  await writeFile(join(outputDir, `${assessment.id}.json`), JSON.stringify(assessment, null, 2));
}

console.log(`Generated ${assessments.length} assessment files`);
