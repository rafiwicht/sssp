import axios, {AxiosPromise, AxiosResponse, Method} from 'axios';

import {AppType} from "../models/service";
import config from "../config";
import {appConf, defaultMeta, navDefault, viewAppInfo} from "./templates";

const githubBaseUrl: string = 'https://api.github.com';
const organisation: string = config.githubOrg;
const message: string = 'Add template files by SSSP automator';


const templates = [
    appConf,
    defaultMeta,
]

const uiTemplates = [
    navDefault,
    viewAppInfo
]


const createRepo = (name: string, read: Array<string>, write: Array<string>, type: AppType) => {
    console.log('-----');
    axiosRequest(
        `/orgs/${organisation}/repos`
    ).then((r: AxiosResponse) => {
        if(!r.data.map(e => {return e.name}).includes(name)) {
            axiosRequest(
                `/orgs/${organisation}/repos`,
                {
                    name: name,
                    private: true,
                    init_init: true
                },
                'POST'
            )
            .then(() => {
                template(name, type);
            }).catch(r => {
                console.log(r);
            });
        }
    }).catch(r => {
        console.log(r);
    });

    return `https://github.com/${organisation}/${name}`;
};

const deleteRepo = (name: string) => {
    axiosRequest(
        `/orgs/${organisation}/repos`
    )
    .then((r: AxiosResponse) => {
        if(r.data.map(e => {return e.name}).includes(name)) {
            axiosRequest(
                `/repos/${organisation}/${name}`,
                {},
                'DELETE'
            )
        }
    });
};

const template = async(name: string, type: AppType) => {
    await axiosRequest(
        `/repos/${organisation}/${name}/contents/README.md`,
        {
            message: 'SSSP Automotator INIT',
            content: Buffer.from(name).toString('base64'),
        },
        'PUT'
    ).catch(r => {console.log(r);});

    const response = await axiosRequest(
        `/repos/${organisation}/${name}/git/matching-refs/heads/master`
    );

    let treeItems = [];

    for (const e of templates) {
        const {path, content} = e(name, type)
        const blobResponse = await axiosRequest(
            `/repos/${organisation}/${name}/git/blobs`,
            {
                content: Buffer.from(content).toString('base64'),
                encoding: 'base64'
            },
            'POST'
        );
        treeItems.push({
            path: path,
            sha: blobResponse.data.sha,
            mode: "100644",
            type: "blob"
        });

    }
    if(type === AppType.UI) {
        for (const e of uiTemplates) {
            const {path, content} = e();
            const blobResponse = await axiosRequest(
                `/repos/${organisation}/${name}/git/blobs`,
                {
                    content: Buffer.from(content).toString('base64'),
                    encoding: 'base64'
                },
                'POST'
            );
            treeItems.push({
                path: path,
                sha: blobResponse.data.sha,
                mode: "100644",
                type: "blob"
            });
        }
    }

    const treeResponse = await axiosRequest(
        `/repos/${organisation}/${name}/git/trees`,
        {
            tree: treeItems,
            base_tree: response.data[0].object.sha
        },
        "POST"
    );

    const commitResponse = await axiosRequest(
        `/repos/${organisation}/${name}/git/commits`,
        {
            message: message,
            tree: treeResponse.data.sha,
            parents: [response.data[0].object.sha]
        },
        "POST"
    );

    await axiosRequest(
        `/repos/${organisation}/${name}/git/refs/heads/master`,
    {
            sha: commitResponse.data.sha
        },
        'PATCH'
    );
}

type AxiosParams = {
    method: Method,
    url: string,
    headers: {
        authorization: string,
        'Accept': string
    },
    data?: object
}

const axiosRequest = (url: string, data: object = null, method : Method = 'GET', headers: object = {}): AxiosPromise => {
    let axiosParams: AxiosParams = {
        method: method,
        url: `${githubBaseUrl}${url}`,
        headers: {
            authorization: `token ${config.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            ...headers
        }
    };
    if(data !== null) {
        axiosParams.data = data;
    }
    return axios(axiosParams);
}

export {createRepo, deleteRepo, template};