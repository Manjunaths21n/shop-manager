export interface IClientService {
    get(urlPath: string): Promise<any>;
    post(urlPath: string, data: Record<string, any>): Promise<any>;
}

export class ClientService implements IClientService {
    #baseURL: string;
    constructor(baseUrl: string) {
        this.#baseURL = baseUrl;
    }


    async #fetch(urlPath: string) {
        try {
            return await fetch(`${this.#baseURL}/${urlPath}`);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async get(urlPath: string) {

        try {
            const response = await this.#fetch(urlPath);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return response.json();
        } catch (err) {
            throw new Error(`Failed to post data Error: ${err}`);
        }
    }

    async post(urlPath: string, data: Record<string, any>) {
        try {
            const response = await fetch(`${this.#baseURL}/${urlPath}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            return response.json();
        } catch (err) {
            throw new Error(`Failed to post data Error: ${err}`);
        }

    }

    // delete() {

    // }

}