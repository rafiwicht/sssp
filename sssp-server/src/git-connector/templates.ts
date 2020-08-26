/**
 * Template files, added to new created repositories
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */


import {AppType} from "../models/service";


// Default app conf
export const appConf = (name: string, type: AppType) => {
    const nameShort = name.split('-')[-1];

    return {
        path: 'default/app.conf',
        content: `#
# Splunk app configuration file

[install]
is_configured = 0

[ui]
${type === AppType.UI ? `is_visible = 1\nlabel = ${AppType} for ${nameShort}`: "is_visible = 0"}

[launcher]
author = SSSP Automator
description = ${type} for ${nameShort}
version = 1.0.0

[package]
check_for_updates = 0
`
    };
}

// default.meta for permissions
// Does not support access permissions
export const defaultMeta = (name: string, type: AppType) => {
    return {
        path: 'metadata/default.meta',
        content: `# Application-level permissions

[]
access = read : [ * ], write : [ admin ]
${type === AppType.UI ? "export = none" : "export = system"}
`
    };
}

// navigation default for Apps with a UI
export const navDefault = () => {
    return {
        path: 'default/data/ui/nav/default.xml',
        content: `<nav>
 <view name="search" default="true" />
    <collection label="Dashboards">
        <view source="unclassified" match="dashboard"/>
        <view label="app info" default="true" />
        <divider />
    </collection>
    <collection label="Views">
        <view source="unclassified" />
        <divider />
    </collection>
    <collection label="Searches &amp; Reports">
        <collection label="Reports">
            <saved source="unclassified" match="report" />
        </collection>
        <divider />
        <saved source="unclassified" />
    </collection>
</nav>
`
    };
}

// defautl page for UI apps
export const viewAppInfo = () => {
    return {
        path: 'default/data/ui/views/app_info.xml',
        content: `<dashboard>
  <label>app info</label>
  <row>
    <panel>
      <html>
        <h1>Welcome to $env:app$</h1>
        <p>This page was created automatically, but can simply edited or deleted by the app owner</p>
        <p>For more information on how to use splunk and where to get more information, please visit our <a href="https://wikit.post.ch/display/SPLUNK/Splunk+Informatik+POST+Home">Confluence page</a></p>
      </html>
    </panel>
  </row>
</dashboard>
`
    };
}

/**
 * Allocation of template to type of apps
 */

export const templates = [
    appConf,
    defaultMeta,
]

export const uiTemplates = [
    navDefault,
    viewAppInfo
]
