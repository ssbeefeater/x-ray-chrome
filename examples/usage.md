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
