export interface IClientService {
    get<T>(urlPath: string): Promise<T>;
    post<T>(urlPath: string, data: any): Promise<T>;
    patch<T>(urlPath: string, data: any): Promise<T>;
    delete<T>(urlPath: string, data?: any): Promise<T>;
}

export class ClientService implements IClientService {
    #baseURL: string;

    constructor(baseUrl: string) {
        this.#baseURL = baseUrl;
    }

    async #request<T>(method: string, urlPath: string, data?: any): Promise<T> {
        try {
            const response = await fetch(`${this.#baseURL}/${urlPath}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: data ? JSON.stringify(data) : undefined,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return response.json();
        } catch (error: any) {
            throw new Error(error.message || String(error));
        }
    }

    get<T>(urlPath: string): Promise<T> {
        return this.#request("GET", urlPath);
    }

    post<T>(urlPath: string, data: any): Promise<T> {
        return this.#request("POST", urlPath, data);
    }

    patch<T>(urlPath: string, data: any): Promise<T> {
        return this.#request("PATCH", urlPath, data);
    }

    delete<T>(urlPath: string, data?: any): Promise<T> {
        return this.#request("DELETE", urlPath, data);
    }
}