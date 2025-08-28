import { ClientService, type IClientService } from '../service';

export interface IItemsServiceLayerLogic {
    getItems(): Promise<any>
    addItem(data: Record<string, any>): Promise<any>
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
            console.error(err);
        }
    }

    async addItem(data: Record<string, any>) {
        try {
            await this.#client.post('items', data);
        } catch (err) {
            console.error(err);
        }
    }
} 