import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the repos.json file
const reposPath = '/Users/imlolman/Projects/Personal/imlolman.github.io/projects/repos.json';
const outputPath = path.join(__dirname, '../public/projects/projects.json');

try {
  const rawData = fs.readFileSync(reposPath, 'utf8');
  const repos = JSON.parse(rawData);

  // Transform the repos data to a simplified format
  const projects = repos.map(repo => ({
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || '',
    homepage: repo.homepage || '',
    htmlUrl: repo.html_url,
    language: repo.language || 'Unknown',
    stargazersCount: repo.stargazers_count || 0,
    forksCount: repo.forks_count || 0,
    topics: repo.topics || [],
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    hasPages: repo.has_pages,
    // Generate image path based on repo name
    imagePath: `/projects/images/${repo.name.toLowerCase().replace(/\s+/g, '-')}.png`
  }));

  // Write the simplified data
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  console.log(`Successfully extracted ${projects.length} projects to ${outputPath}`);
} catch (error) {
  console.error('Error processing repos.json:', error.message);
  process.exit(1);
}

