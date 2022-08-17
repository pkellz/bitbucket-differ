import axios from "axios";
import { Request, Response } from 'express-serve-static-core';
import { ICommit } from '../models';
const { bitbucketAccessToken, workspace } = process.env;

export async function getCommits(req: Request, res: Response) {
  const { service, pullRequestId } = req.params;
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${service}/pullrequests/${pullRequestId}/commits`
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${bitbucketAccessToken}`,
    },
  };
  try {
    const json = (await axios.get(url, requestOptions)).data;

    if (json.error) {
      throw new Error(json.error.message);
    }

    const commits: ICommit[] = json.values.map((commit: any) => {
      return {
        hash: commit.hash,
        date: commit.date,
        author: commit.author.user.display_name,
        message: commit.message,
        diff: commit.links.diff,
        patch: commit.links.patch,
        parents: commit.parents.map((parent: { hash: string, links: object }) => ({
          hash: parent.hash,
          links: parent.links,
        })),
        repository: commit.repository,
      };
    });

    res.json(commits);
  } catch (err) {
    console.log("Error has occurred", err);
    res.json([])
  }
}
