import * as Puppeteer from 'puppeteer';
import { Driver } from 'x-ray-crawler';
import { Context } from 'http-context';

/**
 * Usage
 *
 * [[include:usage.md]]
 */


export interface XRayChromeOptions extends Puppeteer.LaunchOptions {
    /**
     * The view port of the page
     */
    viewPort?: {
        /**
         * @default 1280
         */
        width: number;
        /**
         * @default 800
         */
        height: number;
    };
    /**
     * A function that will be called after the page load and before the page content will be return giving the power to interact
     * with the current page using puppeteer methods like page.click([selector]).
     */
    cl?: (page: Puppeteer.Page, ctx: Context) => void;
    /**
     * The options to set to page.goTo method.
     */
    navigationOptions?: Puppeteer.NavigationOptions;
}

export const xRayChrome = (options: XRayChromeOptions = {}): Driver => {
    const defaults: XRayChromeOptions = {
        viewPort: { width: 1280, height: 800 }
    };
    const {
        viewPort,
        cl,
        navigationOptions,
        ...launchOptions
    } = Object.assign({}, defaults, options);

    return async (ctx, done) => {
        const browser = await Puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        try {
            await page.setViewport(viewPort);
            await page.goto(ctx.url, navigationOptions);
            if (typeof cl === 'function') {
                await cl(page, ctx);
            }

            if (!ctx.body) {
                ctx.body = await page.content();
            }
            done(null, ctx);
        } catch (err) {
           done(err, null);
        }
        await browser.close();
    };
};

export default xRayChrome;
