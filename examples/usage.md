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