import { mkdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import ts from 'typescript';

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
