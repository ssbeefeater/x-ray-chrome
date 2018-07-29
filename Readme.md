
# Usage

### Basic

```javascript
import xRay from 'x-ray';
import xRayChrome from 'x-ray-chrome';

const x = Xray().driver(xRayChrome())
```

### Advanced

```javascript
import xRay from 'x-ray';
import xRayChrome from 'x-ray-chrome';

const x = Xray().driver(xRayChrome({
    viewPort:{ width:360, height:640 },
    cl: async (page, ctx)=>{
            await page.click('button.toggleView');
            await page.waitForSelector('.more-items-list');
            await page.screenshot({path: './screenshot.jpg'});
    },
    navigationOptions:{
        timeout: 30000,
    }
}))
```

### Complex example

```javascript
import xRay from 'x-ray';
import xRayChrome from 'x-ray-chrome';

const x = Xray().driver(xRayChrome({
    cl: async (page, ctx) => {
            // login in github
            await page.type('#login_field', 'github_username');
            await page.type('#password', 'github_password');
            let waitForNavigation = page.waitForNavigation();
            await page.click('[name="commit"]');
            // wait to load the page
            await waitForNavigation;
            waitForNavigation = page.waitForNavigation();
            // wait to the repo page
            await page.goto('https://github.com/ssbeefeater/x-ray-chrome');
            await waitForNavigation;
            await page.waitForSelector('form.js-social-form');
            try {
            // if not already starred will give a star to this repo :P
            // else will throw an error because cant find the button
                await page.click('form.unstarred button[type="submit"]');
            } catch (err) {
                console.log('Repo already starred');
            }
            await page.screenshot({ path: 'star.png' });
            },
            navigationOptions: {
                timeout: 30000,
            }
}));

        const result = await x('https://github.com/login', 'form.js-social-form', {
            stars: 'a.social-count.js-social-count @text',
        });

        console.log(result) // { stars: number_of_stars }

```





* [xRayChrome](#xraychrome)

---

<a id="xraychrome"></a>

### `<Const>` xRayChrome

▸ **xRayChrome**(options?: *[XRayChromeOptions](#options)*): `Driver`


| Param | Type | Default value |
| ------ | ------ | ------ |
| options | [XRayChromeOptions](#options) |  {} |

**Returns:** `Driver`


---


## Options

 `LaunchOptions`

**↳ XRayChromeOptions**


### Properties

* [appMode](#appmode)
* [args](#args)
* [cl](#cl)
* [devtools](#devtools)
* [dumpio](#dumpio)
* [env](#env)
* [executablePath](#executablepath)
* [handleSIGHUP](#handlesighup)
* [handleSIGINT](#handlesigint)
* [handleSIGTERM](#handlesigterm)
* [headless](#headless)
* [ignoreDefaultArgs](#ignoredefaultargs)
* [ignoreHTTPSErrors](#ignorehttpserrors)
* [navigationOptions](#navigationoptions)
* [pipe](#pipe)
* [slowMo](#slowmo)
* [timeout](#timeout)
* [userDataDir](#userdatadir)
* [viewPort](#viewport)

---

## Properties

<a id="appmode"></a>

### `<Optional>` appMode

**● appMode**: *`boolean`*

*Inherited from LaunchOptions.appMode*



Whether to open chrome in appMode. Defaults to false.

___
<a id="args"></a>

### `<Optional>` args

**● args**: *`string`[]*

*Inherited from LaunchOptions.args*



Additional arguments to pass to the Chromium instance. List of Chromium flags can be found here.

___
<a id="cl"></a>

### `<Optional>` cl

**● cl**: *`function`*



A function that will be called after the page load and before the page content will be return giving the power to interact with the current page using puppeteer methods like page.click(\[selector\]).

#### Type declaration
▸(page: *`Page`*, ctx: *`Context`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| page | `Page` |
| ctx | `Context` |

**Returns:** `void`

___
<a id="devtools"></a>

### `<Optional>` devtools

**● devtools**: *`boolean`*

*Inherited from LaunchOptions.devtools*



Whether to auto-open DevTools panel for each tab. If this option is true, the headless option will be set false.

___
<a id="dumpio"></a>

### `<Optional>` dumpio

**● dumpio**: *`boolean`*

*Inherited from LaunchOptions.dumpio*



Whether to pipe browser process stdout and stderr into process.stdout and process.stderr. Defaults to false.

___
<a id="env"></a>

### `<Optional>` env

**● env**: *`any`*

*Inherited from LaunchOptions.env*



Specify environment variables that will be visible to Chromium. Defaults to process.env.

___
<a id="executablepath"></a>

### `<Optional>` executablePath

**● executablePath**: *`string`*

*Inherited from LaunchOptions.executablePath*



Path to a Chromium executable to run instead of bundled Chromium. If executablePath is a relative path, then it is resolved relative to current working directory.

___
<a id="handlesighup"></a>

### `<Optional>` handleSIGHUP

**● handleSIGHUP**: *`boolean`*

*Inherited from LaunchOptions.handleSIGHUP*



Close chrome process on SIGHUP. Defaults to true.

___
<a id="handlesigint"></a>

### `<Optional>` handleSIGINT

**● handleSIGINT**: *`boolean`*

*Inherited from LaunchOptions.handleSIGINT*



Close chrome process on Ctrl-C. Defaults to true.

___
<a id="handlesigterm"></a>

### `<Optional>` handleSIGTERM

**● handleSIGTERM**: *`boolean`*

*Inherited from LaunchOptions.handleSIGTERM*



Close chrome process on SIGTERM. Defaults to true.

___
<a id="headless"></a>

### `<Optional>` headless

**● headless**: *`boolean`*

*Inherited from LaunchOptions.headless*



Whether to run Chromium in headless mode. Defaults to true.

___
<a id="ignoredefaultargs"></a>

### `<Optional>` ignoreDefaultArgs

**● ignoreDefaultArgs**: *`boolean`*

*Inherited from LaunchOptions.ignoreDefaultArgs*



Do not use `puppeteer.defaultArgs()` for launching Chromium. Defaults to false.

___
<a id="ignorehttpserrors"></a>

### `<Optional>` ignoreHTTPSErrors

**● ignoreHTTPSErrors**: *`boolean`*

*Inherited from LaunchOptions.ignoreHTTPSErrors*



Whether to ignore HTTPS errors during navigation. Defaults to false.

___
<a id="navigationoptions"></a>

### `<Optional>` navigationOptions

**● navigationOptions**: *`NavigationOptions`*



The options to set to page.goTo method.

___
<a id="pipe"></a>

### `<Optional>` pipe

**● pipe**: *`boolean`*

*Inherited from LaunchOptions.pipe*



Connects to the browser over a pipe instead of a WebSocket. Defaults to false.

___
<a id="slowmo"></a>

### `<Optional>` slowMo

**● slowMo**: *`number`*

*Inherited from LaunchOptions.slowMo*



Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on.

___
<a id="timeout"></a>

### `<Optional>` timeout

**● timeout**: *`number`*

*Inherited from LaunchOptions.timeout*



Maximum time in milliseconds to wait for the Chrome instance to start. Defaults to 30000 (30 seconds). Pass 0 to disable timeout.

___
<a id="userdatadir"></a>

### `<Optional>` userDataDir

**● userDataDir**: *`string`*

*Inherited from LaunchOptions.userDataDir*



Path to a User Data Directory.

___
<a id="viewport"></a>

### `<Optional>` viewPort

**● viewPort**: *`object`*



The view port of the page

#### Type declaration

 height: `number`

*__default__*: 800

 width: `number`

*__default__*: 1280

___

