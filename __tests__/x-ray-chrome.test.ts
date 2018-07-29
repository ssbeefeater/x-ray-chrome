import * as Xray from 'x-ray';
import xRayChrome from '../src';

describe('x-ray-chrome', () => {
    it('Should normals instantiate xRay', () => {
        const x = Xray().driver(xRayChrome());
        expect(x).toBeInstanceOf(Function);
    });
    it('Should Scan google correctly', async () => {
        const x = Xray().driver(xRayChrome());
        const result = await x('http://google.com', 'title');
        expect(result).toBe('Google');
    });

    it('Scan google correctly', async () => {
        const x = Xray().driver(xRayChrome({
            viewPort: { width: 400, height: 800 },
            navigationOptions: {
                timeout: 30000,
            },
            cl: async (page, ctx) => {
                await page.type('#login_field', 'github_username');
                await page.type('#password', 'github_password');
                const passwordHandler = await page.$('#password');
                const password = await page.evaluate(inp => inp.value, passwordHandler);
                const usernameHandler = await page.$('#login_field');
                const username = await page.evaluate(inp => inp.value, usernameHandler);
                expect({
                    password,
                    username
                }).toEqual({
                    username: 'github_username',
                    password: 'github_password',
                });
                const waitForNavigation = page.waitForNavigation();
                await page.click('[name="commit"]');
                await waitForNavigation;
            }
        }));

        const result = await x('https://github.com/login', '.flash-error', {
            errorMessage: '.container @text',
        });

        expect(result.errorMessage).toEqual(expect.any(String));
    });
    it('Expect to set custom response body', async () => {
        const x = Xray().driver(xRayChrome({
            cl: async (page, ctx) => {
                ctx.body = '<title>Bing</title>';
            }
        }));

        const result = await x('http://google.com', 'title');
        expect(result).toBe('Bing');
    });
});