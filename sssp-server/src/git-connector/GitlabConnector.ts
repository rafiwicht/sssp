/**
 * Git connector for gitlab community edition
 * Does not support changing access permissions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */


import GitConnectorInterface from "./index";
import axios, {AxiosPromise, AxiosResponse, Method} from "axios";
import config from "../config";
import {templates, uiTemplates} from "./templates";
import {encode} from "../helper/url";


class GitlabConnector implements GitConnectorInterface {
    createRepo(name: string, serviceId: string, visible: boolean): string {
        axiosRequest(
            '/projects'
        ).then((r: AxiosResponse) => {
            if(!r.data.map(e => {return e.name}).includes(name)) {
                axiosRequest(
                    '/projects',
                    {
                        name: name,
                        visibility: 'private'
                    },
                    'POST'
                )
                .then((r) =>
                {
                    template(name, r.data.id, visible);
                })
                .catch(r => {
                    console.log(r);
                });
            }
        }).catch(r => {
            console.log(r);
        });
        return `${config.gitlabPubUrl}/${config.gitlabUser}/${name}`;
    }

    deleteRepo(name: string) {
        axiosRequest(
            '/projects'
        ).then((r: AxiosResponse) => {
            // Todo still a bug
            console.log(name);
            const repo = r.data.find(e => e.name === name);
            console.log(repo);
            if(repo) {
                console.log(1);
                axiosRequest(
                    `/projects/${repo.id}`,
                    null,
                    'DELETE'
                );
            }
            else {
                console.log("Repo was already deleted!")
            }
        }).catch(r => {
            console.log(r);
        });
    }

}

const template = async(name: string, id: number, visible: boolean) => {

    for (const e of templates) {
        const {path, content} = e(name, visible)
        await axiosRequest(
            `/projects/${id}/repository/files/${encode(path)}`,
            {
                branch: 'master',
                content: content,
                commit_message: 'Created by SSSP Automator'
            },
            'POST'
        ).catch(r => console.log(r));

    }
    if(visible) {
        for (const e of uiTemplates) {
            const {path, content} = e();
            await axiosRequest(
                `/projects/${id}/repository/files/${encode(path)}`,
                {
                    branch: 'master',
                    content: content,
                    commit_message: 'Created by SSSP Automator'
                },
                'POST'
            ).catch(r => console.log(r));
        }
    }

}

type AxiosParams = {
    method: Method,
    url: string,
    headers: {
        authorization: string,
    },
    data?: object
}

const axiosRequest = (url: string, data: object = null, method : Method = 'GET', headers: object = {}): AxiosPromise => {
    let axiosParams: AxiosParams = {
        method: method,
        url: `${config.gitlabUrl}/api/v4${url}`,
        headers: {
            authorization: `Bearer ${config.gitlabToken}`,
            ...headers
        }
    };
    if(data !== null) {
        axiosParams.data = data;
    }
    return axios(axiosParams);
}

export default GitlabConnector;