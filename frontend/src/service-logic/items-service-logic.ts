import { ClientService, type IClientService } from '../service';

export interface IItemsServiceLayerLogic {
    getItems(): Promise<any>;
    addItem(data: Record<string, any>): Promise<any>;
    addItems(data: Record<string, any>[]): Promise<any>;
    updateItems(data: Record<string, any>[]): Promise<any>;
    deleteItems(ids: string[]): Promise<any>;
}

export class ItemsServiceLayerLogic implements IItemsServiceLayerLogic {
    readonly #client: IClientService;

    constructor(baseUrl: string) {
        this.#client = new ClientService(baseUrl);
    }

    async getItems() {
        try {
            return await this.#client.get('items');
        } catch (err) {
            throw err;
        }
    }

    async addItem(data: Record<string, any>) {
        try {
            return await this.#client.post('item', data);
        } catch (err) {
            throw err;
        }
    }

    async addItems(data: Array<Record<string, any>>) {
        try {
            return await this.#client.post('items', data);
        } catch (err) {
            throw err;
        }
    }

    async updateItems(data: Record<string, any>[]) {
        try {
            return await this.#client.patch('items', data);
        } catch (err) {
            throw err;
        }
    }

    async deleteItems(ids: string[]) {
        try {
            return await this.#client.delete('items', ids);
        } catch (err) {
            throw err;
        }
    }
}
