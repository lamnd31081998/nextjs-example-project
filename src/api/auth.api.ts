import axios from "axios";

export class AuthApi {
    static instance: AuthApi;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static getter that controls access to the singleton instance.
     *
     * This implementation allows you to extend the Singleton class while
     * keeping just one instance of each subclass around.
     */
    public static get getInstance(): AuthApi {
        if (!AuthApi.instance) AuthApi.instance = new AuthApi();
        return AuthApi.instance;
    }

    private readonly api_url = process.env.NEXT_PUBLIC_API_URL;

    async Register(payload: { username: string, name: string, password: string, confirm_password: string }) {
        return axios.post(
            `${this.api_url}/register`,
            payload,
            {
                responseType: 'json'
            }
        )
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log("Register Err === ", err?.response?.data || err);
                return err?.response?.data || err;
            });
    }

    async Login(payload: { username: string, password: string }) {
        return axios.post(
            `${this.api_url}/login`,
            payload,
            {
                responseType: 'json'
            }
        )
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log("Login Err === ", err?.response?.data || err);
                return err?.response?.data || err;
            });
    }

    async Logout(access_token: string) {
        return axios.put(
            `${this.api_url}/logout`,
            {
                responseType: 'json',
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log("Logout Err === ", err?.response?.data || err);
                return err?.response?.data || err;
            });
    }
}

