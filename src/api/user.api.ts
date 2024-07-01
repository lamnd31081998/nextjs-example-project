import axios from "axios";
import FormData from "form-data";

export class UserApi {
    static instance: UserApi;

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
    public static get getInstance(): UserApi {
        if (!UserApi.instance) UserApi.instance = new UserApi();
        return UserApi.instance;
    }

    private readonly api_url = process.env.NEXT_PUBLIC_API_URL;

    async UpdateByToken(payload: FormData, access_token: string) {
        return axios.put(
            `${this.api_url}/user`,
            payload,
            {
                headers:{
                    Authorization: `Bearer ${access_token}`
                },
                responseType: 'json'
            }
        )
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log("UpdateByToken Err === ", err?.response?.data || err);
                return err?.response?.data || err;
            });
    }
}

