import {config as enableDotenv} from 'dotenv';
import { Octokit } from '@octokit/rest';

import { ZenHub } from './zenhub';

enableDotenv();

const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ZENHUB_TOKEN = process.env.ZENHUB_TOKEN;

const REPO_EXTRACT = /^([^\/]+)\/([^\/]+)$/;

interface Epic {
  issues: number[];
}

interface IssueInfo {
  /**
   * Set if the issue is an epic
   */
  epic?: Epic;
  parentEpics: number[];
  blocking: number[];
  blockedBy: number[];
}

(async () => {
  if (!GITHUB_REPO) {
    console.error('Environment variable GITHUB_REPO must be defined');
    process.exit(1);
  }
  if (!GITHUB_TOKEN) {
    console.error('Environment variable GITHUB_TOKEN must be defined');
    process.exit(1);
  }
  if (!ZENHUB_TOKEN) {
    console.error('Environment variable ZENHUB_TOKEN must be defined');
    process.exit(1);
  }

  const repoExtract = REPO_EXTRACT.exec(GITHUB_REPO);
  if (!repoExtract) {
    console.error('Invalid repo GITHUB_REPO');
    process.exit(1);
  }
  const repoInfo = {
    owner: repoExtract[1],
    repo: repoExtract[2]
  }

  const octokit = new Octokit({
    auth: GITHUB_TOKEN
  });

  const issueData = new Map<number, IssueInfo>();

  const getIssue = (issue: number) => {
    let i = issueData.get(issue);
    if (!i) {
      i = {
        parentEpics: [],
        blockedBy: [],
        blocking: []
      };
      issueData.set(issue, i);
    }
    return i;
  }

  const zenhub = new ZenHub(ZENHUB_TOKEN);

  const repo = (await octokit.repos.get(repoInfo)).data;
  console.log(repo.id);

  /** IDs of all issues in repo that are epics */
  const epicIssues = (await zenhub.getEpics(repo.id)).epic_issues
    // Filter only epics for this repo
    .filter(epic => epic.repo_id === repo.id)
    // Map to ID
    .map(epic => epic.issue_number);

  for (const epicIssue of epicIssues) {
    console.log(`fetching info for EPIC: ${epicIssue}`);
    const epic = await zenhub.getEpic(repo.id, epicIssue);
    const issues = epic.issues
      .filter(i => i.repo_id === repo.id)
      .map(i => i.issue_number);
    getIssue(epicIssue).epic = { issues };
    // Update the parents array for each of the included issues
    for (const issue of issues) {
      getIssue(issue).parentEpics.push(epicIssue);
    }
    // TODO: remove
    if (issueData.size > 3) break;
  }

  const dependencies = (await zenhub.getDependencies(repo.id)).dependencies
    .filter(d => d.blocked.repo_id === repo.id && d.blocking.repo_id === repo.id);
  for (const dep of dependencies) {
    getIssue(dep.blocked.issue_number).blockedBy.push(dep.blocking.issue_number);
    getIssue(dep.blocking.issue_number).blocking.push(dep.blocked.issue_number);
  }

  console.log(issueData);

})();
