import {Octokit} from '@octokit/rest';

import GitConnectorInterface from "./index";
import {AppType} from "../models/service";
import config from "../config";


class GithubConnector implements GitConnectorInterface {
    private octokit: Octokit;
    private readonly organisation: string;

    constructor() {
        this.octokit = new Octokit({
            auth: config.githubToken
        });
        this.organisation = config.githubOrg;

    }

    create(name: string, read: [string], write: [string], type: AppType) {
        this.octokit.repos.get({
            repo: name,
            owner: this.organisation
        }).catch(r => {
            if (r.status === 404) {
                this.octokit.repos.createInOrg({
                    org: this.organisation,
                    name: name
                });
            }
            else {
                throw new Error(`Createing app ${name} failed!`);
            }
        });
    }

    delete(name: string) {
    }

}

export default GithubConnector;