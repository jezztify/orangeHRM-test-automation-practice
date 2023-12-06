export class ApiManager {
    authApi?: AuthApi;
    constructor(...apis: (AuthApi)[]) {
        apis.forEach(api => {
            if (api instanceof AuthApi) {
                this.authApi = api
            }
        })
    }
}


// AuthApi

type LoginResponse = {
    login: boolean;
    user: {
        username: string;
        userRole: string;
        status: string;
        employeeName: string;
        employeeId: string;
    };
}
export class AuthApi {
    username: string;
    password: string;
    url: string;
    isLoggedin = false;
    sessionCookie?: string;
    constructor(username: string, password: string, url: string) {
        this.username = username;
        this.password = password;
        this.url = url;
    }

    // // based on OrangeHRM api document but is not working
    // async login() {
    //     const endpoint = `${this.url}/api/v1/login`;
    //     const credentials = {
    //         username: this.username,
    //         password: this.password
    //     };
    //     const response: LoginResponse = await (await fetch(endpoint, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     })).json();
    //    if(response.login) {
    //     this.isLoggedin = true;
    //     console.debug(response);
    //     console.log('Successfully logged in!')
    //    }
    // }

    // Hacky
    async getCSRFToken(url: string) {
        const endpoint = `${url}/web/index.php/auth/login`;
        const response = await fetch(endpoint, { method: 'GET' });
        const responseText = await response.text();
        console.log(responseText);
        let token = responseText.match(/:token="(.*?)"/)?.[1];
        while (token && token!.includes('&quot;')) {
            token = token!.replace('&quot;', '');
        }



        if (!token) {
            console.error('Token not found!');
        } else {
            console.log(`CSRF Token: ${token}`);
            const setCookie = response.headers.get('set-cookie');
            this.sessionCookie = await this.getSessionCookie(setCookie!);
            console.log(`Cookie set after acquiring CSRF Token: ${this.sessionCookie}`);
        }

        return token
    }

    async getSessionCookie(setCookie: string) {
        let finalCookie;
        setCookie.split(';').forEach(cookie => {
            const match = cookie.match(/orangehrm=([^;]+)/);
            if (match) {
                finalCookie = cookie;
            }
        })
        return finalCookie
    }

    async login() {
        const csrfToken = await this.getCSRFToken(this.url);
        if (csrfToken) {

            let endpoint = `${this.url}/web/index.php/auth/validate`;

            const contents = {
                _token: csrfToken,
                username: this.username,
                password: this.password
            }
            var formBodyList: string[] = [];
            Object.entries(contents).forEach((c) => {
                const encodedKey = encodeURIComponent(c[0]);
                const encodedValue = encodeURI(c[1]);
                formBodyList.push(encodedKey + "=" + encodedValue);
            })
            const formBody = formBodyList.join('&');

            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            // headers.append('Cookie', this.sessionCookie!);

            let requestOptions = {
                method: 'POST',
                headers: headers,
                body: formBody
            }

            let response = await fetch(endpoint, requestOptions);
            if (!response.ok) {
                console.error(`Login failed with status ${response.status}`);
            } else {
                const setCookie = response.headers.get('set-cookie');
                console.log(setCookie);

                this.sessionCookie = await this.getSessionCookie(setCookie!);

                if (!this.sessionCookie) {
                    console.error(`Login Failed with status ${response.status}`);
                }
                console.log(`Session Cookie: ${this.sessionCookie}`);

                // test if session cookie is valid
                if (await this.isSessionCookieValid()) {
                    this.isLoggedin = true;
                }
            }

        } else {
            console.error('Login failed. CSRF token not found.')
        }
    }

    async isSessionCookieValid(sessionCookie?: string) {
        const endpoint = `${this.url}/web/index.php/dashboard/index`;
        let headers = new Headers();
        headers.append('Cookie', sessionCookie ?? this.sessionCookie!);
        const requestOptions = {
            method: 'GET',
            headers: headers
        };
        console.log(requestOptions);
        const getResponse = await fetch(endpoint, requestOptions);
        const content = await getResponse.text();


        if (!content.includes('oxd-layout')) {
            console.error('Login failed!');
            return false
        }
        console.log('Login successful!')
        return true
    }
}



// still in development
const authTest = new AuthApi('Admin', 'admin123', 'https://opensource-demo.orangehrmlive.com');
authTest.login()