/**
 * Interface for git connectors
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */


export default interface GitConnectorInterface {
    createRepo(name: string, serviceId: string, visible: boolean): string;
    deleteRepo(name: string): void;
}
