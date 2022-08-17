export interface ICommit {
    hash: string;
    date: string;
    author: string;
    message: string;
    diff: string;
    patch: string;
    parents: { hash: string, links: any }[];
    repository: any;
}
